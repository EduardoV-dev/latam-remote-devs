export interface RouterItem {
    children?: RouterItem[];
    element: React.ReactNode;
    path: string;
}
