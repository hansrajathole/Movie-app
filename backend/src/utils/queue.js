import { processAddMovie } from '../controllers/movie.controller.js';

// Simple in-memory queue implementation
// In a production environment, use a proper message broker like RabbitMQ or Kafka
const queue = {
  tasks: [],
  processing: false
};

// Add task to queue
export const addToQueue = (type, data) => {
  queue.tasks.push({ type, data, timestamp: new Date() });
  console.log(`Added task to queue: ${type}`);
  
  // Start processing if not already running
  if (!queue.processing) {
    processQueue();
  }
};

// Process queue
const processQueue = async () => {
  if (queue.tasks.length === 0) {
    queue.processing = false;
    return;
  }
  
  queue.processing = true;
  const task = queue.tasks.shift();
  
  try {
    console.log(`Processing task: ${task.type}`);
    
    switch (task.type) {
      case 'addMovie':
        await processAddMovie(task.data);
        break;
      default:
        console.warn(`Unknown task type: ${task.type}`);
    }
  } catch (error) {
    console.error(`Error processing task ${task.type}:`, error);
    
    // Re-add failed task to queue with a limit on retries
    if (!task.retries || task.retries < 3) {
      queue.tasks.push({
        ...task,
        retries: (task.retries || 0) + 1
      });
      console.log(`Re-queued task ${task.type} for retry ${(task.retries || 0) + 1}`);
    } else {
      console.error(`Task ${task.type} failed after 3 retries, discarding`);
    }
  }
  
  // Process next task
  setTimeout(processQueue, 100);
};

// Recover unprocessed tasks on startup
export const recoverTasks = () => {
  console.log(`Recovered ${queue.tasks.length} tasks from previous session`);
  
  if (queue.tasks.length > 0 && !queue.processing) {
    processQueue();
  }
};