import Image from "next/image";
import { marks } from "@/components/logos";
import type { Logo } from "@/types";

/**
 * One tile shape for every logo, whether it is an inline mark or a supplied
 * image file, so three different mark geometries still read as a single row.
 *
 * The tile is light because these marks are drawn for light grounds — the FAST
 * seal in particular has white lettering inside it, so it cannot be keyed onto
 * a dark ground without destroying the type.
 */
export function LogoTile({ logo }: { readonly logo: Logo }) {
  if (logo.kind === "image") {
    return (
      <span className="logo-tile" data-logo={logo.id}>
        <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
      </span>
    );
  }

  const Mark = marks[logo.mark];
  return (
    <span className="logo-tile" data-logo={logo.id}>
      <Mark />
    </span>
  );
}
