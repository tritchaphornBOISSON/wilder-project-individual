import { useEffect } from "react";
import {
  actOnEscapeKeydown,
  disablePageScroll,
  enablePageScroll,
} from "../../browser-utils";
import { Box, ButtonGroup, Overlay } from "./Dialog.styled";

const Dialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  useEffect(() => {
    actOnEscapeKeydown(onCancel, true);
    disablePageScroll();

    return () => {
      actOnEscapeKeydown(onCancel, false);
      enablePageScroll();
    };
  }, [onCancel]);
  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <Box>
        Are you sure deleting this Wilder?
        <ButtonGroup>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </ButtonGroup>
      </Box>
    </Overlay>
  );
};

export default Dialog;
