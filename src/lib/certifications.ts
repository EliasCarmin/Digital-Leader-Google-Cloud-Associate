export type CloudProvider = "gcp" | "azure" | "aws";
export type ExamSlug = "digital-leader" | "az-900" | "sc-900";

export interface Exam {
    slug: ExamSlug;
    name: string;
    fullName: string;
    description: string;
    duration: number;
    questionsInExam: number;
    passingScore: number;
    available: boolean;
}

export interface Provider {
    slug: CloudProvider;
    name: string;
    fullName: string;
    color: string;
    exams: Exam[];
}

export const PROVIDERS: Provider[] = [
    {
        slug: "gcp",
        name: "Google Cloud",
        fullName: "Google Cloud Platform",
        color: "#4285F4", // Google Blue
        exams: [
            {
                slug: "digital-leader",
                name: "Digital Leader",
                fullName: "Cloud Digital Leader",
                description: "Ideal para profesionales que buscan demostrar conocimientos básicos de las capacidades de Google Cloud.",
                duration: 90,
                questionsInExam: 50,
                passingScore: 70,
                available: true
            }
        ]
    },
    {
        slug: "azure",
        name: "Azure",
        fullName: "Microsoft Azure",
        color: "#0078D4", // Azure Blue
        exams: [
            {
                slug: "az-900",
                name: "AZ-900",
                fullName: "Azure Fundamentals",
                description: "Conceptos básicos de nube, servicios de Azure, seguridad, privacidad, cumplimiento y confianza.",
                duration: 45,
                questionsInExam: 40,
                passingScore: 70,
                available: true
            },
            {
                slug: "sc-900",
                name: "SC-900",
                fullName: "Security, Compliance, and Identity Fundamentals",
                description: "Conceptos básicos de seguridad, cumplimiento e identidad en los servicios de Microsoft basados en la nube.",
                duration: 45,
                questionsInExam: 40,
                passingScore: 70,
                available: true
            }
        ]
    }
];

export function getProvider(slug: string): Provider | undefined {
    return PROVIDERS.find(p => p.slug === slug);
}

export function getExam(providerSlug: string, examSlug: string): Exam | undefined {
    const provider = getProvider(providerSlug);
    return provider?.exams.find(e => e.slug === examSlug);
}
