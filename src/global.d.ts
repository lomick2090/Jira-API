interface Issue {
    project: string,
    id: string,
    summary: string,
    description?: string,
    assignee?: {
      displayName: string,
      accountId: string
    },
    reporter?: {
      displayName: string,
      accountId: string
    },
    priority: "Highest" | "High" | "Medium" | "Low" | "Lowest",
    created: string,
    duedate?: string,
    timespent?: number
};