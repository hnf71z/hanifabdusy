import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

interface SwapConfig {
  ease: string;
  durDrop: number;
  durMove: number;
  durReturn: number;
  promoteOverlap: number;
  returnDelay: number;
  promoteStagger: number;
  dropDistance: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const isMobile = useIsMobile();
  const activeCardDistance = isMobile ? Math.min(cardDistance, 12) : cardDistance;
  const activeVerticalDistance = isMobile ? Math.min(verticalDistance, 16) : verticalDistance;

  const config = useMemo<SwapConfig>(() => {
    if (isMobile) {
      return {
        ease: 'power2.out',
        durDrop: 0.55,
        durMove: 0.55,
        durReturn: 0.55,
        promoteOverlap: 0.55,
        returnDelay: 0.08,
        promoteStagger: 0.06,
        dropDistance: 280
      };
    }
    return easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
          promoteStagger: 0.15,
          dropDistance: 450
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
          promoteStagger: 0.15,
          dropDistance: 450
        };
  }, [easing, isMobile]);

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    if (total === 0) return;

    refs.forEach((r, i) => {
      if (r.current) placeNow(r.current, makeSlot(i, activeCardDistance, activeVerticalDistance, total), skewAmount);
    });

    if (total < 2) return;

    let timer = 0;
    let lastStart = 0;
    let cancelled = false;
    let paused = false;
    const node = container.current;
    let pauseHandler: (() => void) | null = null;
    let resumeHandler: (() => void) | null = null;

    // Mobile swaps less often to reduce animation load.
    const effectiveDelay = isMobile ? delay * 1.5 : delay;

    const scheduleNext = () => {
      const elapsed = performance.now() - lastStart;
      const wait = Math.max(0, effectiveDelay - elapsed);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!cancelled && !paused) swap();
      }, wait);
    };

    const swap = () => {
      lastStart = performance.now();

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      tlRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
          scheduleNext();
        }
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: `+=${config.dropDistance}`,
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, activeCardDistance, activeVerticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * config.promoteStagger}`
        );
      });

      const backSlot = makeSlot(total - 1, activeCardDistance, activeVerticalDistance, total);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );
    };

    timer = window.setTimeout(swap, 500);

    if (pauseOnHover && node) {
      pauseHandler = () => {
        paused = true;
        tlRef.current?.pause();
        window.clearTimeout(timer);
      };
      resumeHandler = () => {
        paused = false;
        const tl = tlRef.current;
        if (tl && tl.progress() < 1) {
          tl.play();
        } else {
          scheduleNext();
        }
      };
      node.addEventListener('mouseenter', pauseHandler);
      node.addEventListener('mouseleave', resumeHandler);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      tlRef.current?.kill();
      if (node && pauseHandler) node.removeEventListener('mouseenter', pauseHandler);
      if (node && resumeHandler) node.removeEventListener('mouseleave', resumeHandler);
    };
  }, [cardDistance, verticalDistance, activeCardDistance, activeVerticalDistance, delay, pauseOnHover, skewAmount, easing, isMobile, config]);

  const cardWidth = isMobile ? 'min(360px, calc(100vw - 84px))' : width;
  const cardHeight = isMobile ? 330 : height;

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: {
            width: cardWidth,
            height: cardHeight,
            maxWidth: '100%',
            ...(child.props.style ?? {}),
          },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="card-swap-container"
      style={{
        width: cardWidth,
        height: cardHeight,
        maxWidth: '100%',
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
