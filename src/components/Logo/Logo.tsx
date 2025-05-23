import Image from "next/image";

function Logo() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <div className="flex-1 flex items-center gap-2">
      <div className="relative w-18 h-12">
        <Image
          src="/images/logos/logo_with_parrot_face.svg"
          alt="ANG MORNING"
          fill
        />
      </div>
      <span className="text-4xl font-rock tracking-widest select-none">
        MORNING
      </span>
    </div>
  );
}

export { Logo };
