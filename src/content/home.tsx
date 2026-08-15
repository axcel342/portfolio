import type { CompactItem } from "@/types";

export const headline = {
  greeting: "Hi, I’m Momin.",
  lineOne: "I build AI systems that",
  /** Carries the gradient. */
  lineTwo: "survive real users.",
};

export const lede = (
  <>
    AI engineer working on production LLM and agent systems — hybrid retrieval, LangGraph
    orchestration, tool use, and the eval harnesses that tell you whether any of it actually worked.
    Right now I’m on <strong>Ember</strong>, an enterprise agent platform, where the hard part is
    governance rather than generation.
  </>
);

export const alsoBuilt: readonly CompactItem[] = [
  {
    title: "Medical Chat Bot",
    when: "2025",
    detail:
      "Med LLaMA 3 8B fine-tuned on 10K instruction-following Alpaca samples with PEFT on an NVIDIA T4, then deployed on Hugging Face Spaces with llama-cpp-python for optimised inference.",
    stack: ["PyTorch", "Transformers", "PEFT", "LLaMA 3", "Hugging Face Spaces"],
  },
  {
    title: "MedLegal Document Summarisation",
    when: "2024",
    detail:
      "Azure OpenAI and a custom document classifier condensing 1,000+ page medical files into 40-page summaries for doctors, with automated segmentation for medico-legal document structures.",
    stack: ["Python", "Azure OpenAI", "Azure Custom Classifier"],
  },
];

export const education: readonly CompactItem[] = [
  {
    title: "BSc Computer Science",
    when: "Jun 2024",
    detail:
      "FAST National University of Computer and Emerging Sciences, Lahore. Dean’s List of Honour, Fall 2023. Coursework in information retrieval, massive data mining, artificial intelligence and bioinformatics.",
    logo: { kind: "image", id: "fast-nu", src: "/logos/fast-nu.png", width: 198, height: 198 },
  },
];

export const certifications: readonly CompactItem[] = [
  {
    title: "Microsoft Certified: Azure AI Engineer Associate",
    when: "AI-102",
    detail: "Designing and implementing Azure AI solutions.",
    logo: { kind: "mark", id: "microsoft", mark: "microsoft" },
    // Straight to the issuer rather than through LinkedIn's redirect wrapper:
    // more trustworthy to a reader, and it survives LinkedIn's params expiring.
    href: "https://learn.microsoft.com/api/credentials/share/en-us/MominImranQureshi-0804/9415DFC214F7DEBC",
  },
  {
    title: "Hugging Face: AI Agents Fundamentals",
    when: "Certificate",
    detail: "Agent design, tool use and orchestration patterns.",
    logo: { kind: "mark", id: "huggingface", mark: "huggingface" },
    href: "https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/Axcel1/2025-06-14.png",
  },
];

export const contact = {
  title: "Looking for AI engineering work on systems that reach real users.",
  body: "If you’re building with LLMs and need someone who ships and then measures what shipped, I’d like to hear about it. Fastest way to reach me is email.",
};
