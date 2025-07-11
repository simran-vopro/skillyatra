export type Instructor = {
    _id?: string;
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
};


export type CategoryType = {
    _id: string;
    name: string;
}

export type Course = {
    _id?: string;
    createdBy: string;
    title: string;
    thumbnail: string;
    promoVideo: string;
    description: string;
    language: string;
    pricingType: string;
    pricing: number;
    category: { _id?: string, name: string };
    instructor: Instructor;
    whatYouLearn: string;
    courseInclude: string;
    audience: string;
    requirements: string;
    certificate: boolean;
    modules: {
        name: string;
        chapters: {
            title: string;
            description: string;
            video: string;
            audio: string | File;
            image: string | File;
            quiz: {
                question: string;
                options: { name: string }[];
                answer: string;
            }[];
        }[];
    }[];
    status?: boolean,
    updatedAt?: string,
    createdAt?: string
};
