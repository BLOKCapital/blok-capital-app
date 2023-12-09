import styled, { css } from "styled-components";

const ProgressWrapper = styled.div`
  width: 100%;
  height: 20px;
  background: ${({ theme }) => theme.colors.white}1a;
  border-radius: 10px;

  .progress-done {
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    p {
      padding-right: 5px;
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: ${({ theme }) => theme.colors.black};
    }
  }

  ${({ variant }) =>
    variant === "green" &&
    css`
      background: ${({ theme }) => theme.colors.white}1a;

      .progress-done {
        background: ${({ theme }) => theme.colors.secondary};

        p {
          color: ${({ theme }) => theme.colors.white};
        }
      }
    `}

  ${({ variant }) =>
    variant === "dashed" &&
    css`
      width: 100%;
      height: 40px;
      background: ${({ theme }) => theme.colors.white}0d;
      border: 1px dashed ${({ theme }) => theme.colors.white}33;
      border-radius: 20px;
      padding: 8px;

      .progress-done {
        height: 24px;
        background: ${({ theme }) => theme.colors.themeBlue};
        border-radius: 12px;

        p {
          color: ${({ theme }) => theme.colors.white};
        }
      }
    `}

  ${({ variant }) =>
    variant === "dashed2" &&
    css`
      width: 100%;
      height: 40px;
      background: ${({ theme }) => theme.colors.white}0d;
      border: 1px dashed ${({ theme }) => theme.colors.white}33;
      border-radius: 20px;
      padding: 8px;

      .progress-done {
        height: 24px;
        background: ${({ theme }) => theme.colors.linearGradient2};
        border-radius: 12px;

        p {
          color: ${({ theme }) => theme.colors.white};
        }
      }
    `}
`;

export default ProgressWrapper;
