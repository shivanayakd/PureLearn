interface OverlayProps {
  closeMenu: () => void;
}

const Overlay = ({ closeMenu }: OverlayProps) => {
  return (
    <div
      className="fixed top-0 right-0 left-64 z-51 h-full w-full bg-black/80 md:hidden"
      aria-label="Close menu overlay"
      tabIndex={0}
      onClick={closeMenu}
      onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
    />
  );
};

export default Overlay;
