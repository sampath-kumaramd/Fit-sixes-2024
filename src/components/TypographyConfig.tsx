import { cva, VariantProps } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      default: 'font-gotham',
      GothamBlack:
        "font-['Gotham-Black'] font-normal text-[18px] leading-[24px] tracking-normal font-serif",
      HempaSansLg:
        "font-['Hempa_Sans'] font-normal text-[20px] leading-[27.9px] tracking-normal",
      Anton:
              "font-['Anton']  text-[36px] leading-[43.2px] tracking-normal text-center",
      Oswald:
        "font-['Oswald'] font-normal text-[18px] leading-[24px] tracking-normal",
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}
