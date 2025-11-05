// Smart Medicine Reminder App
// Main Application JavaScript

class MedicineReminderApp {
  constructor() {
    this.user = null;
    this.medicines = [];
    this.medicineSchedule = [];
    this.currentScreen = 'welcome';
    this.currentDate = new Date();
    this.notifications = [];
    this.medicineHistory = [];
    
    // Sample medicine data for simulation
    this.sampleMedicines = [
      {
        id: 'med1',
        name: 'Aspirin 100mg',
        dosage: '1 tablet',
        times: ['8:00 AM', '8:00 PM'],
        instructions: 'Take with food',
        frequency: 'twice daily',
        duration: '30 days'
      },
      {
        id: 'med2', 
        name: 'Lisinopril 10mg',
        dosage: '1 tablet',
        times: ['9:00 AM'],
        instructions: 'Take on empty stomach',
        frequency: 'once daily',
        duration: '30 days'
      },
      {
        id: 'med3',
        name: 'Metformin 500mg', 
        dosage: '2 tablets',
        times: ['7:00 AM', '7:00 PM'],
        instructions: 'Take with meals',
        frequency: 'twice daily',
        duration: '30 days'
      }
    ];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupPWA();
    this.checkUserStatus();
    this.updateDateTime();
    this.generateMedicineSchedule();
    
    // Start notification system
    this.startNotificationSystem();
  }

  bindEvents() {
    // Welcome screen events
    document.getElementById('getStartedBtn')?.addEventListener('click', () => {
      this.navigateToScreen('signup');
    });
    
    document.getElementById('loginBtn')?.addEventListener('click', () => {
      this.navigateToScreen('dashboard');
    });
    
    document.getElementById('backToWelcome')?.addEventListener('click', () => {
      this.navigateToScreen('welcome');
    });

    // Signup form
    document.getElementById('signupForm')?.addEventListener('submit', (e) => {
      this.handleSignup(e);
    });

    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        this.navigateToScreen(screen);
        this.updateNavigation(screen);
      });
    });

    // Upload events
    document.getElementById('browseFileBtn')?.addEventListener('click', () => {
      document.getElementById('prescriptionFile').click();
    });
    
    document.getElementById('prescriptionFile')?.addEventListener('change', (e) => {
      this.handleFileUpload(e);
    });
    
    document.getElementById('confirmSchedule')?.addEventListener('click', () => {
      this.confirmMedicineSchedule();
    });

    // Upload area drag and drop
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.processFile(files[0]);
        }
      });
      
      uploadArea.addEventListener('click', () => {
        document.getElementById('prescriptionFile').click();
      });
    }

    // Profile events
    document.getElementById('editProfileBtn')?.addEventListener('click', () => {
      this.showEditProfileModal();
    });
    
    document.getElementById('closeEditModal')?.addEventListener('click', () => {
      this.hideEditProfileModal();
    });
    
    document.getElementById('cancelEdit')?.addEventListener('click', () => {
      this.hideEditProfileModal();
    });
    
    document.getElementById('editProfileForm')?.addEventListener('submit', (e) => {
      this.handleProfileUpdate(e);
    });

    // Settings toggles
    document.getElementById('notificationsToggle')?.addEventListener('change', (e) => {
      this.updateNotificationSettings(e.target.checked);
    });
    
    document.getElementById('soundToggle')?.addEventListener('change', (e) => {
      this.updateSoundSettings(e.target.checked);
    });

    // Action buttons
    document.getElementById('downloadScheduleBtn')?.addEventListener('click', () => {
      this.downloadSchedule();
    });
    
    document.getElementById('resetDataBtn')?.addEventListener('click', () => {
      this.resetAllData();
    });

    // Schedule view toggle
    document.querySelectorAll('.toggle-option').forEach(option => {
      option.addEventListener('click', () => {
        this.toggleScheduleView(option.dataset.view);
      });
    });

    // Calendar navigation
    document.getElementById('prevMonth')?.addEventListener('click', () => {
      this.navigateMonth(-1);
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
      this.navigateMonth(1);
    });

    // Notification events
    document.getElementById('notificationBtn')?.addEventListener('click', () => {
      this.showNotifications();
    });
    
    document.querySelector('.toast-close')?.addEventListener('click', () => {
      this.hideNotificationToast();
    });

    // Medicine modal events
    document.getElementById('closeMedicineModal')?.addEventListener('click', () => {
      this.hideMedicineModal();
    });
    
    document.getElementById('markTaken')?.addEventListener('click', () => {
      this.markMedicineStatus('taken');
    });
    
    document.getElementById('markMissed')?.addEventListener('click', () => {
      this.markMedicineStatus('missed');
    });
    
    document.getElementById('skipDose')?.addEventListener('click', () => {
      this.markMedicineStatus('skipped');
    });

    // PWA install events
    document.getElementById('installBtn')?.addEventListener('click', () => {
      this.installPWA();
    });
    
    document.getElementById('dismissInstall')?.addEventListener('click', () => {
      this.dismissInstallPrompt();
    });

    // Close modals on outside click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
      }
    });
  }

  // User Management
  handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const age = document.getElementById('userAge').value;
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !age || !email) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    this.user = {
      name,
      age: parseInt(age),
      email,
      joinDate: new Date().toISOString(),
      settings: {
        notifications: true,
        sound: true
      },
      stats: {
        totalMedicines: 0,
        adherenceRate: 0,
        streakDays: 0
      }
    };

    this.showToast(`Welcome, ${name}!`, 'success');
    this.navigateToScreen('upload');
    this.updateProfile();
  }

  checkUserStatus() {
    // Check if user exists (in a real app, this would check localStorage or server)
    if (this.user) {
      this.navigateToScreen('dashboard');
    } else {
      this.navigateToScreen('welcome');
    }
  }

  updateProfile() {
    if (!this.user) return;

    const profileName = document.getElementById('profileName');
    const profileDetails = document.getElementById('profileDetails');
    const profileInitials = document.getElementById('profileInitials');
    const userGreeting = document.getElementById('userGreeting');

    if (profileName) profileName.textContent = this.user.name;
    if (profileDetails) profileDetails.textContent = `Age ${this.user.age} • ${this.user.email}`;
    if (profileInitials) {
      const initials = this.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
      profileInitials.textContent = initials;
    }
    if (userGreeting) {
      const hour = new Date().getHours();
      let greeting = 'Hello';
      if (hour < 12) greeting = 'Good morning';
      else if (hour < 18) greeting = 'Good afternoon';
      else greeting = 'Good evening';
      userGreeting.textContent = `${greeting}, ${this.user.name.split(' ')[0]}!`;
    }

    this.updateProfileStats();
  }

  updateProfileStats() {
    if (!this.user) return;

    const totalMeds = this.medicines.length;
    const totalDoses = this.getTotalDosesForPeriod(30); // Last 30 days
    const takenDoses = this.getTakenDosesForPeriod(30);
    const adherenceRate = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
    const streakDays = this.calculateStreakDays();

    document.getElementById('totalMedsProfile').textContent = totalMeds;
    document.getElementById('adherenceRate').textContent = `${adherenceRate}%`;
    document.getElementById('streakDays').textContent = streakDays;

    this.user.stats = {
      totalMedicines: totalMeds,
      adherenceRate,
      streakDays
    };
  }

  showEditProfileModal() {
    if (!this.user) return;
    
    document.getElementById('editName').value = this.user.name;
    document.getElementById('editAge').value = this.user.age;
    document.getElementById('editEmail').value = this.user.email;
    
    document.getElementById('editProfileModal').classList.remove('hidden');
  }

  hideEditProfileModal() {
    document.getElementById('editProfileModal').classList.add('hidden');
  }

  handleProfileUpdate(e) {
    e.preventDefault();
    
    const name = document.getElementById('editName').value.trim();
    const age = document.getElementById('editAge').value;
    const email = document.getElementById('editEmail').value.trim();

    if (!name || !age || !email) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    this.user.name = name;
    this.user.age = parseInt(age);
    this.user.email = email;

    this.updateProfile();
    this.hideEditProfileModal();
    this.showToast('Profile updated successfully!', 'success');
  }

  // Medicine Management
  handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  processFile(file) {
    // Show upload progress
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('uploadProgress').classList.remove('hidden');
    
    // Simulate file processing
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          this.showAnalysisResults();
        }, 500);
      }
      progressFill.style.width = progress + '%';
    }, 200);
  }

  showAnalysisResults() {
    document.getElementById('uploadProgress').classList.add('hidden');
    document.getElementById('analysisResults').classList.remove('hidden');
    
    // Show extracted medicines
    const container = document.getElementById('extractedMedicines');
    container.innerHTML = '';
    
    this.sampleMedicines.forEach(medicine => {
      const medicineDiv = document.createElement('div');
      medicineDiv.className = 'extracted-medicine';
      medicineDiv.innerHTML = `
        <h4>${medicine.name}</h4>
        <p><strong>Dosage:</strong> ${medicine.dosage}</p>
        <p><strong>Frequency:</strong> ${medicine.frequency}</p>
        <p><strong>Times:</strong> ${medicine.times.join(', ')}</p>
        <p><strong>Instructions:</strong> ${medicine.instructions}</p>
      `;
      container.appendChild(medicineDiv);
    });
  }

  confirmMedicineSchedule() {
    this.medicines = [...this.sampleMedicines];
    this.generateMedicineSchedule();
    this.showToast('Medicine schedule created successfully!', 'success');
    this.navigateToScreen('dashboard');
    this.updateDashboard();
  }

  generateMedicineSchedule() {
    this.medicineSchedule = [];
    const today = new Date();
    
    // Generate schedule for next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      this.medicines.forEach(medicine => {
        medicine.times.forEach(time => {
          const [hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
          let hour = parseInt(hours);
          if (period === 'PM' && hour !== 12) hour += 12;
          if (period === 'AM' && hour === 12) hour = 0;
          
          const scheduleDate = new Date(date);
          scheduleDate.setHours(hour, parseInt(minutes), 0, 0);
          
          this.medicineSchedule.push({
            id: `${medicine.id}-${date.toDateString()}-${time}`,
            medicineId: medicine.id,
            medicine: medicine,
            date: date.toDateString(),
            time: time,
            scheduledDateTime: scheduleDate,
            status: 'pending' // pending, taken, missed, skipped
          });
        });
      });
    }
  }

  getTodaysMedicines() {
    const today = new Date().toDateString();
    return this.medicineSchedule.filter(item => item.date === today)
      .sort((a, b) => a.scheduledDateTime - b.scheduledDateTime);
  }

  getUpcomingReminders() {
    const now = new Date();
    const next2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    return this.medicineSchedule
      .filter(item => {
        return item.scheduledDateTime > now && 
               item.scheduledDateTime <= next2Hours && 
               item.status === 'pending';
      })
      .sort((a, b) => a.scheduledDateTime - b.scheduledDateTime)
      .slice(0, 3);
  }

  markMedicineStatus(status) {
    const modalTitle = document.getElementById('medicineModalTitle');
    const medicineId = modalTitle.dataset.medicineId;
    
    if (medicineId) {
      const scheduleItem = this.medicineSchedule.find(item => item.id === medicineId);
      if (scheduleItem) {
        scheduleItem.status = status;
        
        // Add to history
        this.medicineHistory.push({
          ...scheduleItem,
          markedAt: new Date().toISOString(),
          markedStatus: status
        });
        
        this.updateDashboard();
        this.updateProfileStats();
        this.hideMedicineModal();
        
        const statusText = status === 'taken' ? 'taken' : 
                          status === 'missed' ? 'marked as missed' : 'skipped';
        this.showToast(`Medicine ${statusText} successfully!`, 'success');
      }
    }
  }

  showMedicineDetails(medicineScheduleId) {
    const scheduleItem = this.medicineSchedule.find(item => item.id === medicineScheduleId);
    if (!scheduleItem) return;
    
    const modal = document.getElementById('medicineModal');
    const title = document.getElementById('medicineModalTitle');
    const content = document.getElementById('medicineModalContent');
    
    title.textContent = scheduleItem.medicine.name;
    title.dataset.medicineId = medicineScheduleId;
    
    content.innerHTML = `
      <div class="medicine-detail-item">
        <strong>Dosage:</strong> ${scheduleItem.medicine.dosage}
      </div>
      <div class="medicine-detail-item">
        <strong>Time:</strong> ${scheduleItem.time}
      </div>
      <div class="medicine-detail-item">
        <strong>Instructions:</strong> ${scheduleItem.medicine.instructions}
      </div>
      <div class="medicine-detail-item">
        <strong>Status:</strong> <span class="status status--${scheduleItem.status}">${scheduleItem.status}</span>
      </div>
    `;
    
    modal.classList.remove('hidden');
  }

  hideMedicineModal() {
    document.getElementById('medicineModal').classList.add('hidden');
  }

  // Dashboard Updates
  updateDashboard() {
    this.updateSummaryCards();
    this.updateTodaysMedicines();
    this.updateUpcomingReminders();
    this.updateDateTime();
  }

  updateSummaryCards() {
    const todaysMeds = this.getTodaysMedicines();
    const totalCount = todaysMeds.length;
    const takenCount = todaysMeds.filter(med => med.status === 'taken').length;
    const pendingCount = todaysMeds.filter(med => med.status === 'pending').length;
    
    document.getElementById('totalMedicines').textContent = totalCount;
    document.getElementById('takenMedicines').textContent = takenCount;
    document.getElementById('pendingMedicines').textContent = pendingCount;
  }

  updateTodaysMedicines() {
    const container = document.getElementById('todaysMedicines');
    const todaysMeds = this.getTodaysMedicines();
    
    container.innerHTML = '';
    
    if (todaysMeds.length === 0) {
      container.innerHTML = '<p class="text-center">No medicines scheduled for today.</p>';
      return;
    }
    
    todaysMeds.forEach(scheduleItem => {
      const card = this.createMedicineCard(scheduleItem);
      container.appendChild(card);
    });
  }

  updateUpcomingReminders() {
    const container = document.getElementById('upcomingReminders');
    const upcoming = this.getUpcomingReminders();
    
    container.innerHTML = '';
    
    if (upcoming.length === 0) {
      container.innerHTML = '<p class="text-center">No upcoming reminders in the next 2 hours.</p>';
      return;
    }
    
    upcoming.forEach(scheduleItem => {
      const reminderDiv = document.createElement('div');
      reminderDiv.className = 'reminder-item';
      reminderDiv.innerHTML = `
        <div class="reminder-info">
          <h4>${scheduleItem.medicine.name}</h4>
          <p>${scheduleItem.time} • ${scheduleItem.medicine.dosage}</p>
        </div>
        <div class="reminder-time">
          ${this.getTimeUntil(scheduleItem.scheduledDateTime)}
        </div>
      `;
      container.appendChild(reminderDiv);
    });
  }

  createMedicineCard(scheduleItem) {
    const card = document.createElement('div');
    card.className = `medicine-card ${scheduleItem.status}`;
    
    card.innerHTML = `
      <div class="medicine-header">
        <div class="medicine-info">
          <h4>${scheduleItem.medicine.name}</h4>
          <div class="medicine-details">
            ${scheduleItem.medicine.dosage} • ${scheduleItem.medicine.instructions}
          </div>
        </div>
        <div class="medicine-time">${scheduleItem.time}</div>
      </div>
      <div class="medicine-actions">
        <button class="action-btn taken" onclick="app.markMedicineStatus('taken'); app.hideMedicineModal();" data-id="${scheduleItem.id}">
          ✓ Taken
        </button>
        <button class="action-btn missed" onclick="app.markMedicineStatus('missed'); app.hideMedicineModal();" data-id="${scheduleItem.id}">
          ✗ Missed
        </button>
        <button class="action-btn skip" onclick="app.showMedicineDetails('${scheduleItem.id}')">
          👁 Details
        </button>
      </div>
    `;
    
    return card;
  }

  // Schedule Screen
  toggleScheduleView(view) {
    document.querySelectorAll('.toggle-option').forEach(option => {
      option.classList.toggle('active', option.dataset.view === view);
    });
    
    document.querySelectorAll('.schedule-view').forEach(viewEl => {
      viewEl.classList.toggle('active', viewEl.id === view + 'View');
    });
    
    if (view === 'calendar') {
      this.renderCalendar();
    } else if (view === 'list') {
      this.renderMedicinesList();
    }
  }

  renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    currentMonthEl.textContent = `${this.currentDate.toLocaleDateString('en-US', { month: 'long' })} ${year}`;
    
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell header';
      cell.textContent = day;
      calendarGrid.appendChild(cell);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';
      calendarGrid.appendChild(cell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';
      cell.textContent = day;
      
      const cellDate = new Date(year, month, day);
      const dateString = cellDate.toDateString();
      
      // Check if today
      if (dateString === today.toDateString()) {
        cell.classList.add('today');
      }
      
      // Check if has medicines
      const hasMedicines = this.medicineSchedule.some(item => item.date === dateString);
      if (hasMedicines) {
        cell.classList.add('has-medicines');
      }
      
      cell.addEventListener('click', () => {
        this.selectCalendarDate(dateString);
      });
      
      calendarGrid.appendChild(cell);
    }
  }

  selectCalendarDate(dateString) {
    // Remove previous selection
    document.querySelectorAll('.calendar-cell.selected').forEach(cell => {
      cell.classList.remove('selected');
    });
    
    // Add selection to clicked cell
    event.target.classList.add('selected');
    
    // Show day details
    this.showDayDetails(dateString);
  }

  showDayDetails(dateString) {
    const dayDetails = document.getElementById('dayDetails');
    const selectedDateEl = document.getElementById('selectedDate');
    const dayMedicines = document.getElementById('dayMedicines');
    
    const date = new Date(dateString);
    selectedDateEl.textContent = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
    
    const medicines = this.medicineSchedule.filter(item => item.date === dateString);
    
    dayMedicines.innerHTML = '';
    
    if (medicines.length === 0) {
      dayMedicines.innerHTML = '<p>No medicines scheduled for this day.</p>';
    } else {
      medicines.forEach(scheduleItem => {
        const medicineDiv = document.createElement('div');
        medicineDiv.className = 'day-medicine-item';
        medicineDiv.innerHTML = `
          <div class="medicine-info">
            <strong>${scheduleItem.medicine.name}</strong>
            <span>${scheduleItem.time} • ${scheduleItem.medicine.dosage}</span>
          </div>
          <span class="status status--${scheduleItem.status}">${scheduleItem.status}</span>
        `;
        dayMedicines.appendChild(medicineDiv);
      });
    }
    
    dayDetails.classList.remove('hidden');
  }

  renderMedicinesList() {
    const container = document.getElementById('allMedicinesList');
    container.innerHTML = '';
    
    if (this.medicines.length === 0) {
      container.innerHTML = '<p class="text-center">No medicines added yet.</p>';
      return;
    }
    
    this.medicines.forEach(medicine => {
      const medicineDiv = document.createElement('div');
      medicineDiv.className = 'medicine-schedule-item';
      medicineDiv.innerHTML = `
        <h4>${medicine.name}</h4>
        <p><strong>Dosage:</strong> ${medicine.dosage}</p>
        <p><strong>Times:</strong> ${medicine.times.join(', ')}</p>
        <p><strong>Frequency:</strong> ${medicine.frequency}</p>
        <p><strong>Instructions:</strong> ${medicine.instructions}</p>
      `;
      container.appendChild(medicineDiv);
    });
  }

  navigateMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.renderCalendar();
  }

  // Navigation
  navigateToScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
      targetScreen.classList.add('active');
      this.currentScreen = screenName;
      
      // Update content based on screen
      switch (screenName) {
        case 'dashboard':
          this.updateDashboard();
          break;
        case 'schedule':
          this.renderCalendar();
          break;
        case 'profile':
          this.updateProfile();
          break;
      }
    }
  }

  updateNavigation(activeScreen) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === activeScreen);
    });
  }

  // Utilities
  updateDateTime() {
    const todaysDate = document.getElementById('todaysDate');
    if (todaysDate) {
      const today = new Date();
      todaysDate.textContent = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  getTimeUntil(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) return 'Now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  getTotalDosesForPeriod(days) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return this.medicineSchedule.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= new Date();
    }).length;
  }

  getTakenDosesForPeriod(days) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return this.medicineSchedule.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= new Date() && item.status === 'taken';
    }).length;
  }

  calculateStreakDays() {
    // Calculate consecutive days with 100% adherence
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toDateString();
      
      const dayMeds = this.medicineSchedule.filter(item => item.date === dateString);
      if (dayMeds.length === 0) continue;
      
      const takenMeds = dayMeds.filter(item => item.status === 'taken');
      const adherence = takenMeds.length / dayMeds.length;
      
      if (adherence === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  // Notifications
  startNotificationSystem() {
    // Check for due medicines every minute
    setInterval(() => {
      this.checkForDueMedicines();
    }, 60000); // 1 minute
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  checkForDueMedicines() {
    const now = new Date();
    const dueMedicines = this.medicineSchedule.filter(item => {
      const timeDiff = item.scheduledDateTime - now;
      return timeDiff <= 0 && timeDiff > -300000 && item.status === 'pending'; // Within 5 minutes
    });
    
    dueMedicines.forEach(medicine => {
      this.sendNotification(medicine);
    });
  }

  sendNotification(medicineSchedule) {
    const title = 'Medicine Reminder';
    const message = `Time to take ${medicineSchedule.medicine.name}`;
    
    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: message,
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" fill="%233B82F6"/%3E%3Cpath d="M16 6c-1.3 0-2.5 1.3-2.5 2.5v3.75H9.75c-1.3 0-2.5 1.3-2.5 2.5s1.2 2.5 2.5 2.5h3.75v3.75c0 1.3 1.2 2.5 2.5 2.5s2.5-1.2 2.5-2.5v-3.75h3.75c1.3 0 2.5-1.2 2.5-2.5s-1.2-2.5-2.5-2.5h-3.75V8.5c0-1.2-1.2-2.5-2.5-2.5z" fill="white"/%3E%3C/svg%3E'
      });
      
      notification.onclick = () => {
        window.focus();
        this.navigateToScreen('dashboard');
        notification.close();
      };
    }
    
    // Show in-app toast
    this.showToast(message, 'info');
    
    // Update notification badge
    this.updateNotificationBadge();
  }

  updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const pendingCount = this.medicineSchedule.filter(item => {
      const now = new Date();
      return item.scheduledDateTime <= now && item.status === 'pending';
    }).length;
    
    if (pendingCount > 0) {
      badge.textContent = pendingCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  showNotifications() {
    const pendingMedicines = this.medicineSchedule.filter(item => {
      const now = new Date();
      return item.scheduledDateTime <= now && item.status === 'pending';
    });
    
    if (pendingMedicines.length === 0) {
      this.showToast('No pending notifications', 'info');
      return;
    }
    
    // Show notification list (simplified - could be a modal)
    let message = 'Pending medicines:\n';
    pendingMedicines.forEach(med => {
      message += `• ${med.medicine.name} at ${med.time}\n`;
    });
    
    this.showToast(message, 'warning');
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    const toastTitle = document.querySelector('.toast-title');
    const toastMessage = document.querySelector('.toast-message');
    
    toastTitle.textContent = 'Medicine Reminder';
    toastMessage.textContent = message;
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
      this.hideNotificationToast();
    }, 5000);
  }

  hideNotificationToast() {
    const toast = document.getElementById('notificationToast');
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }

  updateNotificationSettings(enabled) {
    if (this.user) {
      this.user.settings.notifications = enabled;
    }
    
    if (enabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  updateSoundSettings(enabled) {
    if (this.user) {
      this.user.settings.sound = enabled;
    }
  }

  // PWA Functions
  setupPWA() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install prompt after a delay
      setTimeout(() => {
        this.showInstallPrompt();
      }, 10000);
    });
    
    this.deferredPrompt = deferredPrompt;
  }

  showInstallPrompt() {
    document.getElementById('installPrompt').classList.remove('hidden');
  }

  installPWA() {
    const promptEvent = this.deferredPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          this.showToast('App installed successfully!', 'success');
        }
        this.deferredPrompt = null;
        this.dismissInstallPrompt();
      });
    }
  }

  dismissInstallPrompt() {
    document.getElementById('installPrompt').classList.add('hidden');
  }

  // Data Management
  downloadSchedule() {
    const scheduleData = {
      user: this.user,
      medicines: this.medicines,
      schedule: this.medicineSchedule,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(scheduleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medicine-schedule.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    this.showToast('Schedule downloaded successfully!', 'success');
  }

  resetAllData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      this.user = null;
      this.medicines = [];
      this.medicineSchedule = [];
      this.medicineHistory = [];
      
      // Reset UI
      document.getElementById('uploadArea').style.display = 'block';
      document.getElementById('uploadProgress').classList.add('hidden');
      document.getElementById('analysisResults').classList.add('hidden');
      
      // Reset form
      document.getElementById('signupForm').reset();
      
      this.navigateToScreen('welcome');
      this.showToast('All data has been reset', 'info');
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MedicineReminderApp();
});

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Create a simple service worker inline
    const swCode = `
      const CACHE_NAME = 'medicine-reminder-v1';
      const urlsToCache = [
        './',
        './index.html',
        './style.css',
        './app.js'
      ];
      
      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });
      
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
          )
        );
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}