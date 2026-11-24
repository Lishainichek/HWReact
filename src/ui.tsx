import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import type { ButtonVariant } from './theme';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html { color-scheme: ${({ theme }) => theme.mode}; }
  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.page};
    color: ${({ theme }) => theme.colors.text};
    font: 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: background 0.2s, color 0.2s;
  }
  button, input { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; }
`;

export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const rotate = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid currentColor;
  border-right-color: ${({ theme }) => theme.colors.transparent};
  border-radius: 50%;
  animation: ${rotate} 0.65s linear infinite;
`;

const sizes = {
  sm: css`min-height: 34px; padding: 6px 12px; font-size: 13px;`,
  md: css`min-height: 42px; padding: 9px 17px; font-size: 14px;`,
  lg: css`min-height: 50px; padding: 12px 22px; font-size: 16px;`,
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid;
  border-radius: 11px;
  font-weight: 650;
  white-space: nowrap;
  transition: background 0.15s, transform 0.15s;
  ${({ $size }) => sizes[$size]};
  ${({ theme, $variant }) => {
    const palette = theme.buttons[$variant];
    return css`
      background: ${palette.background};
      color: ${palette.text};
      border-color: ${palette.border};
      &:hover:not(:disabled) { background: ${palette.hover}; transform: translateY(-1px); }
    `;
  }}
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
  &:disabled { opacity: 0.55; }
`;

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, children, ...rest }: ButtonProps) {
  return (
    <StyledButton
      {...rest}
      $variant={variant}
      $size={size}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  );
}

const StyledBadge = styled.span<{ $muted: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 650;
  background: ${({ theme, $muted }) => $muted ? theme.colors.mutedSurface : theme.colors.badgeBackground};
  color: ${({ theme, $muted }) => $muted ? theme.colors.mutedText : theme.colors.badgeText};
`;

export function Badge({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <StyledBadge $muted={muted}>{children}</StyledBadge>;
}

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 17px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: transform 0.16s;
  &:hover { transform: translateY(-3px); }
`;

export const Input = styled.input.attrs({ type: 'search' })`
  min-width: 0;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  outline: 0;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  &::placeholder { color: ${({ theme }) => theme.colors.mutedText}; }
  &:focus-visible { outline: 2px solid ${({ theme }) => theme.colors.focus}; outline-offset: 1px; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 18px;
  @media (min-width: 600px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (min-width: 1180px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`;
