import styled from "styled-components";

const Loader = styled.div`
  display: inline-block;
  width: 100%;
  height: 10px;
  border-radius: 40px;
  background-color: red;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: 150%;
    height: 100%;
    background-image: linear-gradient(332deg, #6bff7f, #32ff3c);
    border-radius: inherit;
    transform: scaleX(0);
    transform-origin: left;
    animation: load5123 1s infinite;

    @keyframes load5123 {
      50% {
        transform: scaleX(1);
      }

      100% {
        transform: scaleX(0);
        transform-origin: right;
      }
    }
  }
`;

export default Loader;
