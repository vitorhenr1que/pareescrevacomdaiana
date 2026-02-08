export interface Book {
  id: number;
  title: string;
  slug: string;
  coverUrl: string;
  description: string;
  topics: string[];
  pdfUrl: string;
  year?: string;
  publisher?: string;
}

export interface Video {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
}

export interface Education {
  period: string;
  degree: string;
  institution: string;
}

export interface Author {
  name: string;
  fullName: string;
  tagline: string;
  bioShort: string;
  bioLong: string;
  photoUrl: string;
}

export interface ContentData {
  author: Author;
  profiles: {
    lattesUrl: string;
    orcidUrl: string;
  };
  youtube: {
    channelUrl: string;
    channelHandle: string;
    channelId: string;
    rssUrl: string;
  };
  books: Book[];
  education: Education[];
  expertise: string[];
  social: {
    instagram: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
}