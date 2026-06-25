import { caseStudyOgImage, size, contentType } from "../../og";

export { size, contentType };
export const alt = "World App · A11 Studio case study";

export default function Image() {
  return caseStudyOgImage("World App", "Designing no.1 wallet in the world");
}
