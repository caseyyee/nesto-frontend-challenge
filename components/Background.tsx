export function Background() {
  return (
    <>
      <div className="absolute w-full h-[900px] top-[-300px] lg:h-[1600px] lg:top-[-550px] [background-image:radial-gradient(circle_at_center_center,white,#c5d3e8),repeating-radial-gradient(circle_at_center_center,transparent,transparent,80px,#dae3f0_100px,#dae3f0_100px)] lg:[background-image:radial-gradient(circle_at_center_center,white,#c5d3e8),repeating-radial-gradient(circle_at_center_center,transparent,transparent,160px,#dae3f0_200px,#dae3f0_200px)] [background-blend-mode:multiply]" />
      <div className="absolute w-full h-[800px] lg:h-[1600px] top-0 [background-image:radial-gradient(circle_at_center_center,transparent_40%,var(--color-baby-blue)_70%)]" />
      <div className="absolute w-full h-[600px] top-[100px] lg:h-[800px] lg:top-[300px] [background-image:linear-gradient(to_bottom,transparent,transparent_50%,var(--color-baby-blue)_80%)]" />
    </>
  );
}
