export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  tags: string[];
}

export interface Tag{
  name: string
}

export interface Tags{
  tags: Tag[]
}

export interface TaskForm {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  tags: string[];
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTags: string[];
}

export interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  filteredTasks: Task[];
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskForm) => void;
  editTask?: Task;
}

export interface TagFilterProps {
  uniqueTags: string[];
}

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


export interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}