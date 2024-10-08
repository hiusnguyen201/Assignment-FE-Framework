import { Fragment, memo, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import useScreen from "#src/hooks/useScreen";

type HeaderModalProps = {
  title: string | ReactNode;
  rightHeaderAction?: ReactNode;
  children?: ReactNode;
  anchorEl: ReactNode;
};

export default memo(function FormModalLayout({
  title,
  rightHeaderAction,
  anchorEl,
  children,
}: HeaderModalProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isMobile } = useScreen();

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Box onClick={handleOpen}>{anchorEl}</Box>
      <AnimatePresence>
        {openModal && (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="create-user"
            aria-describedby="create-user"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Box className="w-screen h-screen rounded-none bg-white">
                {/* Header */}
                <Box
                  component="header"
                  className="w-full px-3 border-b border-gray-200 flex items-center justify-between"
                  sx={{
                    height: `var(--form-modal-header-height)`,
                  }}
                >
                  <Box className="flex items-center gap-2">
                    <Tooltip title="Close">
                      <IconButton onClick={handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    {title}
                  </Box>

                  {rightHeaderAction}
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    maxHeight: `calc(100vh - var(--form-modal-header-height))`,
                    overflowY: "auto",
                  }}
                >
                  <Box
                    className="mx-auto"
                    sx={{
                      padding: isMobile ? 1 : 3,
                      paddingBottom: 0,
                      maxWidth: `var(--form-modal-content-max-width)`,
                    }}
                  >
                    {children}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </Fragment>
  );
});
