interface OverlayProps {
  closeMenu: () => void;
}

const Overlay = ({ closeMenu }: OverlayProps) => {
  return (
    <div
      className="absolute top-0 left-0 z-51 h-full w-full bg-black/80 md:hidden"
      aria-label="Close menu overlay"
      tabIndex={0}
      onClick={closeMenu}
      onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
    />
  );
};

export default Overlay;
