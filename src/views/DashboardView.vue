<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  name: 'DashboardView',
  components: {
    TheNavbar,
    TheFooter
  },
  data() {
    return {
      activeTab: 'overview',
      taskFilters: {
        status: 'all',
        priority: 'all'
      },
      settings: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    
    userInitials() {
      if (!this.currentUser || !this.currentUser.name) return '?'
      
      const nameParts = this.currentUser.name.split(' ')
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase()
      }
      
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
    },
    
    activeTabTitle() {
      const titles = {
        'overview': 'Dashboard Overview',
        'projects': 'My Projects',
        'tasks': 'My Tasks',
        'calendar': 'Calendar',
        'settings': 'Settings'
      }
      
      return titles[this.activeTab] || 'Dashboard'
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    }
  },
  mounted() {
    if (this.currentUser) {
      this.settings.name = this.currentUser.name
      this.settings.email = this.currentUser.email
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: calc(100vh - 150px); /* Adjust based on navbar and footer height */
}

.sidebar {
  width: 250px;
  background-color: var(--plum-purple);
  padding: 20px 0;
}

.user-info {
  padding: 0 20px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: var(--coral-pink);
  color: var(--pure-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.user-name {
  font-weight: 500;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 10px 20px;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
}

.sidebar-menu li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-menu li.active {
  background-color: var(--coral-pink);
}

.sidebar-menu a {
  color: var(--pure-white);
  text-decoration: none;
  display: block;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--deep-navy);
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.content-header h1 {
  font-family: 'Montserrat', sans-serif;
  color: var(--golden-amber);
  font-size: 1.8rem;
  margin: 0;
}

/* Overview Cards */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background-color: var(--plum-purple);
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  font-weight: 500;
}

.card-body {
  padding: 15px;
}

.card-value {
  font-size: 2.5rem;
  margin: 10px 0;
  color: var(--golden-amber);
}

.card-text {
  color: rgba(255, 255, 255, 0.7);
}

/* Activity List */
.recent-activity {
  margin-top: 30px;
}

.recent-activity h3 {
  color: var(--golden-amber);
  margin-bottom: 15px;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-time {
  min-width: 100px;
  color: rgba(255, 255, 255, 0.7);
}

.activity-content {
  flex-grow: 1;
}

.activity-content p {
  margin: 0;
}

.activity-content strong {
  color: var(--golden-amber);
}

/* Projects */
.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  background-color: var(--plum-purple);
  border-radius: 10px;
  overflow: hidden;
}

.project-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.project-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.project-status {
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 4px;
}

.in-progress {
  background-color: var(--golden-amber);
  color: #000;
}

.not-started {
  background-color: var(--lime-green);
  color: #000;
}

.completed {
  background-color: var(--coral-pink);
  color: #fff;
}

.project-details {
  padding: 15px;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

/* Tasks */
.tasks-filters {
  display: flex;
  margin-bottom: 20px;
}

.filter-group {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.filter-group label {
  margin-right: 10px;
}

.filter-group select {
  background-color: var(--plum-purple);
  color: var(--pure-white);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.task-item {
  display: flex;
  background-color: var(--plum-purple);
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
}

.task-item.completed {
  opacity: 0.7;
}

.task-checkbox {
  margin-right: 15px;
}

.task-checkbox input[type="checkbox"] {
  display: none;
}

.task-checkbox label {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 2px solid var(--golden-amber);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}

.task-checkbox input[type="checkbox"]:checked + label::after {
  content: '✓';
  position: absolute;
  top: -3px;
  left: 3px;
  color: var(--golden-amber);
}

.task-details {
  flex-grow: 1;
}

.task-details h4 {
  margin: 0 0 5px 0;
  color: var(--golden-amber);
}

.task-details p {
  margin: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.7);
}

.task-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.8rem;
}

.task-project {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 3px 8px;
  border-radius: 4px;
}

.task-priority {
  padding: 3px 8px;
  border-radius: 4px;
}

.task-priority.high {
  background-color: #e74c3c;
  color: #fff;
}

.task-priority.medium {
  background-color: #f39c12;
  color: #000;
}

.task-priority.low {
  background-color: #3498db;
  color: #fff;
}

/* Calendar */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-placeholder {
  height: 400px;
  background-color: var(--plum-purple);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Settings */
.settings-form {
  max-width: 600px;
  margin: 0 auto;
}

.settings-form h3 {
  color: var(--golden-amber);
  margin-bottom: 20px;
}

.settings-form .form-group {
  margin-bottom: 20px;
}

.theme-options {
  display: flex;
  gap: 10px;
}

.theme-option {
  padding: 5px 15px;
  background-color: var(--plum-purple);
  border: none;
  border-radius: 5px;
  color: var(--pure-white);
  cursor: pointer;
}

.theme-option:first-child {
  border: 2px solid var(--golden-amber);
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    order: 2;
  }
  
  .main-content {
    order: 1;
  }
  
  .overview-cards,
  .projects-list {
    grid-template-columns: 1fr;
  }
}
</style>
<template>
  <div>
    <TheNavbar />
    
    <div class="dashboard-container">
      <div class="sidebar">
        <div class="user-info">
          <div class="avatar">{{ userInitials }}</div>
          <div class="user-name">{{ currentUser.name }}</div>
        </div>
        
        <ul class="sidebar-menu">
          <li :class="{ active: activeTab === 'overview' }">
            <a href="#" @click.prevent="setActiveTab('overview')">
              Overview
            </a>
          </li>
          <li :class="{ active: activeTab === 'projects' }">
            <a href="#" @click.prevent="setActiveTab('projects')">
              Projects
            </a>
          </li>
          <li :class="{ active: activeTab === 'tasks' }">
            <a href="#" @click.prevent="setActiveTab('tasks')">
              Tasks
            </a>
          </li>
          <li :class="{ active: activeTab === 'calendar' }">
            <a href="#" @click.prevent="setActiveTab('calendar')">
              Calendar
            </a>
          </li>
          <li :class="{ active: activeTab === 'settings' }">
            <a href="#" @click.prevent="setActiveTab('settings')">
              Settings
            </a>
          </li>
        </ul>
      </div>
      
      <div class="main-content">
        <div class="content-header">
          <h1>{{ activeTabTitle }}</h1>
          <div class="actions">
            <button v-if="activeTab === 'projects' || activeTab === 'tasks'" class="btn btn-primary">
              Add New {{ activeTab === 'projects' ? 'Project' : 'Task' }}
            </button>
          </div>
        </div>
        
        <!-- Dashboard Overview -->
        <div v-if="activeTab === 'overview'" class="tab-content">
          <div class="overview-cards">
            <div class="card">
              <div class="card-header">Active Projects</div>
              <div class="card-body">
                <h2 class="card-value">5</h2>
                <p class="card-text">2 due this week</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">Pending Tasks</div>
              <div class="card-body">
                <h2 class="card-value">12</h2>
                <p class="card-text">4 high priority</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">Completed Tasks</div>
              <div class="card-body">
                <h2 class="card-value">28</h2>
                <p class="card-text">This month</p>
              </div>
            </div>
          </div>
          
          <div class="recent-activity">
            <h3>Recent Activity</h3>
            <ul class="activity-list">
              <li class="activity-item">
                <div class="activity-time">10:30 AM</div>
                <div class="activity-content">
                  <p>You created a new task <strong>"Update homepage design"</strong></p>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-time">Yesterday</div>
                <div class="activity-content">
                  <p>You completed <strong>"Database optimization"</strong> task</p>
                </div>
              </li>
              <li class="activity-item">
                <div class="activity-time">2 days ago</div>
                <div class="activity-content">
                  <p>You started a new project <strong>"E-commerce Platform"</strong></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Projects Tab -->
        <div v-else-if="activeTab === 'projects'" class="tab-content">
          <div class="projects-list">
            <div class="project-card">
              <div class="project-header">
                <h3>E-commerce Platform</h3>
                <span class="project-status in-progress">In Progress</span>
              </div>
              <div class="project-details">
                <p>Building a new e-commerce platform with Vue.js and Node.js</p>
                <div class="project-meta">
                  <span>Due: 15 Apr 2025</span>
                  <span>Tasks: 8/15</span>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-header">
                <h3>Mobile App Redesign</h3>
                <span class="project-status not-started">Not Started</span>
              </div>
              <div class="project-details">
                <p>Redesigning the mobile app interface for better user experience</p>
                <div class="project-meta">
                  <span>Due: 30 Apr 2025</span>
                  <span>Tasks: 0/10</span>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-header">
                <h3>API Integration</h3>
                <span class="project-status completed">Completed</span>
              </div>
              <div class="project-details">
                <p>Integrating third-party APIs for payment processing</p>
                <div class="project-meta">
                  <span>Completed: 15 Mar 2025</span>
                  <span>Tasks: 6/6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tasks Tab -->
        <div v-else-if="activeTab === 'tasks'" class="tab-content">
          <div class="tasks-filters">
            <div class="filter-group">
              <label>Status:</label>
              <select v-model="taskFilters.status">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label>Priority:</label>
              <select v-model="taskFilters.priority">
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <div class="tasks-list">
            <div class="task-item">
              <div class="task-checkbox">
                <input type="checkbox" id="task1">
                <label for="task1"></label>
              </div>
              <div class="task-details">
                <h4>Update homepage design</h4>
                <p>Redesign the homepage according to new brand guidelines</p>
                <div class="task-meta">
                  <span class="task-project">E-commerce Platform</span>
                  <span class="task-due-date">Due: Tomorrow</span>
                  <span class="task-priority high">High Priority</span>
                </div>
              </div>
            </div>
            
            <div class="task-item">
              <div class="task-checkbox">
                <input type="checkbox" id="task2">
                <label for="task2"></label>
              </div>
              <div class="task-details">
                <h4>Setup payment gateway</h4>
                <p>Integrate with Stripe for payment processing</p>
                <div class="task-meta">
                  <span class="task-project">E-commerce Platform</span>
                  <span class="task-due-date">Due: Next week</span>
                  <span class="task-priority medium">Medium Priority</span>
                </div>
              </div>
            </div>
            
            <div class="task-item completed">
              <div class="task-checkbox">
                <input type="checkbox" id="task3" checked>
                <label for="task3"></label>
              </div>
              <div class="task-details">
                <h4>Database optimization</h4>
                <p>Optimize database queries for better performance</p>
                <div class="task-meta">
                  <span class="task-project">API Integration</span>
                  <span class="task-completed">Completed: Yesterday</span>
                  <span class="task-priority high">High Priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Calendar Tab -->
        <div v-else-if="activeTab === 'calendar'" class="tab-content">
          <div class="calendar-header">
            <button class="btn btn-sm">&lt;</button>
            <h3>April 2025</h3>
            <button class="btn btn-sm">&gt;</button>
          </div>
          
          <div class="calendar-grid">
            <!-- Calendar grid implementation would go here -->
            <div class="calendar-placeholder">
              <p>Calendar view will be implemented here</p>
            </div>
          </div>
        </div>
        
        <!-- Settings Tab -->
        <div v-else-if="activeTab === 'settings'" class="tab-content">
          <div class="settings-form">
            <h3>Profile Settings</h3>
            
            <div class="form-group">
              <label for="settings-name">Name</label>
              <input type="text" id="settings-name" class="form-control" v-model="settings.name">
            </div>
            
            <div class="form-group">
              <label for="settings-email">Email</label>
              <input type="email" id="settings-email" class="form-control" v-model="settings.email">
            </div>
            
            <div class="form-group">
              <label>Theme</label>
              <div class="theme-options">
                <button class="theme-option" title="Dark Theme (Current)">Dark</button>
                <button class="theme-option" title="Light Theme">Light</button>
              </div>
            </div>
            
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>