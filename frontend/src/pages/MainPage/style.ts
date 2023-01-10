import styled from "styled-components";

export const UserButton = styled.div`
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: .3s all;
  text-align: center;

  &:hover {
    color: #8987F8;
    transition: .3s all;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;

  object-fit: cover;
  object-position: center;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  cursor: pointer;
`;

export const PaginateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

interface PagblockProps {
  active: boolean;
}

export const Pagblock = styled.div<PagblockProps>`

  width: 30px;
  height: 30px;

  font-size: 20px;
  line-height: 20px;
  font-weight: bold;
  color: var(--primary-color);
  background: white;
  border: 2px solid var(--primary-color);

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.active && `
    background: var(--primary-color);
    color: #FFF;
  `}
`;

interface ButtonProps {
  isLoading?: boolean;
}

export const UpdateButton = styled.button<ButtonProps>`
  background: var(--primary-color);
  border-radius: 4px;

  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  outline: none;
  border: none;

  color: white;
  padding: 4px 8px;
  position: relative;

  transition: .3s all;

  // NOTE(AlexZhaba): fix that ..
  &:hover {
    background: #7777f9;
  }

  &:focus {
    background: #5a5aed;
    transform: scale(0.97);
  }

  ${props => props.isLoading && `
    &::before {
      z-index: 1;
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, .4);
      cursor: not-allowed;
      font-size: 40px;
      border-radius: 5px;
      
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 5px;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;