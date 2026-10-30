export interface TaskDetail {
  id: string
  title: string
  description: string
  requirements: string
  category: string
  budget: number
  deadline: string
}

export interface RequesterDetail {
  id: string
  name: string
  username: string
  avatar: string
  email: string
  rating: number
  completedContracts: number
  location: string
  joinedAt: string
}

export interface OfferDetail {
  id: string
  proposedBudget: number
  proposedDeadline: string
  coverLetter: string
  acceptedAt: string
}

export interface WorkerDetail {
  id: string
  name: string
  username: string
  avatar: string
  email: string
  rating: number
  completedContracts: number
  location: string
  joinedAt: string
}

export interface TermsDetail {
  agreedBudget: number
  currency: string
  deadline: string
  startDate: string
  completionDate: string | null
  paymentType: "fixed"
  description: string
}

export interface DeliverablesDetail {
  id: string
  title: string
  description: string
  status: "pending" | "submitted" | "approved" | "revision_requested"
  submittedAt: string | null
}

export interface AttachmentDetail {
  id: string
  name: string
  type: string
  size: string
  url: string
  uploadedBy: string
  uploadedAt: string
}

export interface MessageDetail {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  message: string
  type: "text" | "file"
  attachmentId?: string
  createdAt: string
  isRead: boolean
}

export interface ActivityDetail {
  id: string
  type:
    | "contract_created"
    | "offer_accepted"
    | "message"
    | "file_uploaded"
    | "work_submitted"
    | "revision_requested"
    | "work_approved"
    | "contract_completed"
  description: string
  performedBy: string
  createdAt: string
}

export interface ContractDetail {
  id: string
  contractNumber: string
  status:
    "active" | "submitted" | "revision_requested" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string

  task: TaskDetail

  requester: RequesterDetail
  worker: WorkerDetail

  offer: OfferDetail

  terms: TermsDetail
  deliverables: DeliverablesDetail[]

  attachments: AttachmentDetail[]

  messages: MessageDetail[]

  activity: ActivityDetail[]
}

export const contractDetailDummyData: ContractDetail = {
  id: "contract_01J9FYTX82",
  contractNumber: "FYT-CON-2026-00124",
  status: "active",
  createdAt: "2026-10-24T10:30:00.000Z",
  updatedAt: "2026-10-29T14:45:00.000Z",

  task: {
    id: "task_01J9TASK872",
    title: "Build a responsive landing page",
    description:
      "Looking for a frontend developer to build a modern, responsive landing page for our SaaS product. The page should have a clean design, smooth interactions, and excellent performance across desktop and mobile devices.",
    requirements:
      "Must be familiar with Next.js, React, TypeScript and Tailwind CSS. The implementation should follow responsive design principles and reusable component architecture.",
    category: "development",
    budget: 8000,
    deadline: "2026-11-15T18:30:00.000Z",
  },

  requester: {
    id: "user_requester_001",
    name: "Rahul Sharma",
    username: "rahulsharma",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "rahul@example.com",
    rating: 4.8,
    completedContracts: 12,
    location: "Hyderabad, India",
    joinedAt: "2025-06-12T10:00:00.000Z",
  },

  worker: {
    id: "user_worker_001",
    name: "Alex Chen",
    username: "alexchen",
    avatar: "https://i.pravatar.cc/150?img=11",
    email: "alex@example.com",
    rating: 4.9,
    completedContracts: 28,
    location: "Bangalore, India",
    joinedAt: "2024-11-20T10:00:00.000Z",
  },

  offer: {
    id: "offer_01J9OFFER21",
    proposedBudget: 7500,
    proposedDeadline: "2026-11-15T18:30:00.000Z",
    coverLetter:
      "Hi Rahul! I have experience building responsive SaaS landing pages using Next.js and Tailwind CSS. I can create a clean, modern interface with reusable components and ensure that the page performs well across all devices. I'd love to work on this project.",
    acceptedAt: "2026-10-24T10:25:00.000Z",
  },

  terms: {
    agreedBudget: 7500,
    currency: "INR",
    deadline: "2026-11-15T18:30:00.000Z",
    startDate: "2026-10-24T10:30:00.000Z",
    completionDate: null,
    paymentType: "fixed",
    description:
      "Build and deliver a responsive SaaS landing page according to the requirements agreed upon by both parties.",
  },

  deliverables: [
    {
      id: "deliverable_01",
      title: "Landing page UI",
      description: "Complete responsive landing page implementation.",
      status: "pending",
      submittedAt: null,
    },
    {
      id: "deliverable_02",
      title: "Responsive mobile layout",
      description: "Mobile and tablet responsive implementation.",
      status: "pending",
      submittedAt: null,
    },
    {
      id: "deliverable_03",
      title: "Source code",
      description: "Clean, reusable and documented source code.",
      status: "pending",
      submittedAt: null,
    },
  ],

  attachments: [
    {
      id: "file_001",
      name: "Landing_Page_Reference.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      url: "/dummy-files/landing-page-reference.pdf",
      uploadedBy: "user_requester_001",
      uploadedAt: "2026-10-24T11:00:00.000Z",
    },
    {
      id: "file_002",
      name: "Brand_Guidelines.fig",
      type: "application/octet-stream",
      size: "5.8 MB",
      url: "/dummy-files/brand-guidelines.fig",
      uploadedBy: "user_requester_001",
      uploadedAt: "2026-10-24T11:05:00.000Z",
    },
    {
      id: "file_003",
      name: "Initial_Design.png",
      type: "image/png",
      size: "1.2 MB",
      url: "/dummy-files/initial-design.png",
      uploadedBy: "user_worker_001",
      uploadedAt: "2026-10-28T14:20:00.000Z",
    },
  ],

  messages: [
    {
      id: "message_001",
      senderId: "user_requester_001",
      senderName: "Rahul Sharma",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      message:
        "Hey Alex! Thanks for accepting the project. I've uploaded the brand guidelines and reference PDF. Please take a look before starting.",
      type: "text",
      createdAt: "2026-10-24T11:10:00.000Z",
      isRead: true,
    },
    {
      id: "message_002",
      senderId: "user_worker_001",
      senderName: "Alex Chen",
      senderAvatar: "https://i.pravatar.cc/150?img=11",
      message:
        "Thanks Rahul! I've reviewed the references. I'll start with the initial layout and share the first design shortly.",
      type: "text",
      createdAt: "2026-10-24T11:30:00.000Z",
      isRead: true,
    },
    {
      id: "message_003",
      senderId: "user_worker_001",
      senderName: "Alex Chen",
      senderAvatar: "https://i.pravatar.cc/150?img=11",
      message:
        "I've completed the initial design direction. Please review the attached screenshot.",
      type: "text",
      createdAt: "2026-10-28T14:25:00.000Z",
      isRead: true,
    },
    {
      id: "message_004",
      senderId: "user_requester_001",
      senderName: "Rahul Sharma",
      senderAvatar: "https://i.pravatar.cc/150?img=12",
      message:
        "The direction looks good! Please make the hero section slightly more compact on mobile.",
      type: "text",
      createdAt: "2026-10-29T14:45:00.000Z",
      isRead: false,
    },
  ],

  activity: [
    {
      id: "activity_001",
      type: "offer_accepted",
      description: "Rahul Sharma accepted Alex Chen's offer.",
      performedBy: "user_requester_001",
      createdAt: "2026-10-24T10:25:00.000Z",
    },
    {
      id: "activity_002",
      type: "contract_created",
      description: "Contract was successfully created.",
      performedBy: "system",
      createdAt: "2026-10-24T10:30:00.000Z",
    },
    {
      id: "activity_003",
      type: "file_uploaded",
      description: "Rahul Sharma uploaded Landing_Page_Reference.pdf.",
      performedBy: "user_requester_001",
      createdAt: "2026-10-24T11:00:00.000Z",
    },
    {
      id: "activity_004",
      type: "file_uploaded",
      description: "Alex Chen uploaded Initial_Design.png.",
      performedBy: "user_worker_001",
      createdAt: "2026-10-28T14:20:00.000Z",
    },
    {
      id: "activity_005",
      type: "message",
      description: "Rahul Sharma sent a message.",
      performedBy: "user_requester_001",
      createdAt: "2026-10-29T14:45:00.000Z",
    },
  ],
}
