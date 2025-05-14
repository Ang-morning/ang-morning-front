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
    <div className="flex-1 flex justify-center gap-2">
      <Image
        src="/images/logos/logo_with_black_eye.jpeg"
        alt="ANG MORNING"
        width={100}
        height={100}
      />
      <span className="text-5xl font-rock tracking-widest select-none">
        MORNING
      </span>
    </div>
  );
}

export { Logo };
