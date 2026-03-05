import type { Translations } from "./vi";

const en: Translations = {
    // Auth - Sign In
    signIn: {
        welcome: "Welcome back",
        subtitle: "Sign in to your Moji account",
        username: "Username",
        password: "Password",
        submit: "Sign In",
        noAccount: "Don't have an account?",
        signUp: "Sign Up",
        terms: "By continuing, you agree to our",
        termsOfService: "Terms of Service",
        and: "and",
        privacyPolicy: "Privacy Policy",
        ofOurs: ".",
        usernameMin: "Username must be at least 3 characters",
        passwordMin: "Password must be at least 6 characters",
    },

    // Auth - Sign Up
    signUp: {
        title: "Create a Moji account",
        subtitle: "Welcome! Sign up to get started!",
        lastName: "Last Name",
        firstName: "First Name",
        username: "Username",
        email: "Email",
        password: "Password",
        submit: "Create Account",
        hasAccount: "Already have an account?",
        signIn: "Sign In",
        lastNameRequired: "Please enter your last name",
        firstNameRequired: "Please enter your first name",
        usernameMin: "Username must be at least 3 characters",
        emailInvalid: "Please enter a valid email address",
        passwordMin: "Password must be at least 6 characters",
    },

    // Sidebar
    sidebar: {
        groupChat: "Group Chat",
        friends: "Friends",
        addFriend: "Add Friend",
    },

    // Nav User
    navUser: {
        account: "Account",
        notifications: "Notifications",
        logOut: "Log out",
    },

    // Chat
    chat: {
        welcomeTitle: "Welcome to Moji",
        welcomeSubtitle: "Select a conversation to start chatting",
        messagePlaceholder: "Type a message...",
        messageError: "Error sending message. Please try again!",
        newMessage: "New Message",
        startConversation: "Start a new conversation",
        friendList: "Friends List",
        loadingFriends: "Loading friends list...",
        noFriends: "No friends yet",
    },

    // Add Friend
    addFriend: {
        title: "Add Friend",
        searchByUsername: "Search by Username",
        searchPlaceholder: "Enter username here...",
        usernameRequired: "Username is required",
        notFound: "Not found",
        cancel: "Cancel",
        searching: "Searching...",
        search: "Search",
        found: "Found",
        alreadyFound: "",
        introduction: "Introduction",
        introPlaceholder: "Hi! Can we be friends?",
        goBack: "Go Back",
        sending: "Sending...",
        addFriend: "Add Friend",
    },

    // Group Chat
    groupChat: {
        createTitle: "Create new group chat",
        createGroup: "Create Group",
        groupName: "Group Name",
        groupNamePlaceholder: "Enter group name here",
        inviteMembers: "Invite Members",
        searchPlaceholder: "Search by display name",
        creating: "Creating...",
        mustInvite: "You must invite at least 1 member to the group",
    },

    // Friend Request
    friendRequest: {
        title: "Friend Requests",
        received: "Received",
        sent: "Sent",
        noReceived: "You have no friend requests.",
        noSent: "You haven't sent any friend requests.",
        accept: "Accept",
        decline: "Decline",
        waiting: "Waiting for response...",
        acceptSuccess: "Friend request accepted",
        declineSuccess: "Friend request declined",
    },

    // Profile & Settings
    profile: {
        title: "Profile & Settings",
        tabAccount: "Account",
        tabConfig: "Settings",
        tabSecurity: "Security",
    },

    // Account Tab
    account: {
        title: "Personal Information",
        subtitle: "Update your personal details and profile information",
        displayName: "Display Name",
        displayNamePlaceholder: "Enter display name",
        username: "Username",
        usernamePlaceholder: "Enter username",
        email: "Email",
        emailPlaceholder: "Enter email",
        phone: "Phone Number",
        phonePlaceholder: "Enter phone number",
        bio: "Bio",
        bioPlaceholder: "Write a few words about yourself...",
        save: "Save Changes",
        saving: "Saving...",
    },

    // Config Tab
    config: {
        title: "App Settings",
        subtitle: "Customize your interface and experience",
        darkMode: "Dark Mode",
        darkModeOn: "Dark mode is enabled",
        darkModeOff: "Using light mode",
        notifications: "Notifications",
        notificationsSubtitle: "Receive notifications for new messages",
        language: "Language",
        languageUsing: "Using English",
    },

    // Security Tab
    security: {
        title: "Account Security",
        subtitle: "Change your password to protect your account",
        currentPassword: "Current Password",
        currentPasswordPlaceholder: "Enter current password",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter new password (at least 6 characters)",
        confirmPassword: "Confirm New Password",
        confirmPasswordPlaceholder: "Re-enter new password",
        changePassword: "Change Password",
        changing: "Processing...",
        fillAll: "Please fill in all fields",
        passwordMin: "New password must be at least 6 characters",
        passwordMismatch: "Passwords do not match",
    },

    // Toast messages
    toast: {
        signUpSuccess: "Sign up successful! Redirecting to sign in page.",
        signUpError: "Sign up failed",
        signInWelcome: "Welcome back to Moji 🎉",
        signInError: "Sign in failed!",
        logoutSuccess: "Logged out successfully!",
        logoutError: "Error logging out. Please try again!",
        fetchUserError: "Error fetching user data. Please try again!",
        sessionExpired: "Session expired. Please sign in again!",
        uploadAvatarError: "Avatar upload failed",
        updateProfileSuccess: "Profile updated successfully!",
        updateProfileError: "Profile update failed",
        changePasswordSuccess: "Password changed successfully!",
        changePasswordError: "Password change failed",
    },
};

export default en;
