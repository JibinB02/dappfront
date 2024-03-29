import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];



export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Decentralization",
    description:
      " DApp voting systems operate on decentralized networks such as blockchain, ensuring that no single authority has control over the voting process. This enhances transparency and reduces the risk of manipulation or fraud.",
  },
  {
    icon: <Fingerprint />,
    text: "Transparency",
    description:
      "The transparency of blockchain technology allows for real-time auditing of the voting process. Anyone can verify the integrity of the election by inspecting the blockchain, increasing trust in the outcome."
  },
  {
    icon: <ShieldHalf />,
    text: "Immutable Record",
    description:
      "Votes recorded on a blockchain are immutable, meaning they cannot be altered or deleted once they are cast. This ensures the integrity of the voting process and prevents tampering with the results.",
  },
  {
    icon: <BatteryCharging />,
    text: "Security",
    description:
      "DApp voting systems leverage cryptographic techniques to secure the voting process. Each voter has a unique cryptographic identity, and votes are encrypted to protect privacy and prevent tampering.",
  },
  {
    icon: <PlugZap />,
    text: "Accessibility",
    description:
      "DApp voting systems can be accessed from anywhere with an internet connection, increasing accessibility for voters who may face barriers in traditional voting systems, such as physical mobility issues or geographical constraints.",
  },
  {
    icon: <GlobeLock />,
    text: "Cost-Efficiency",
    description:
      "By eliminating the need for physical polling stations, paper ballots, and manual vote counting, DApp voting systems can reduce the costs associated with conducting elections, making the process more efficient and scalable.",
  },
];

