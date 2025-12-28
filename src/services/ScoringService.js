export class ScoringService {
    static calculateScore(contact) {
        let score = 0;
        const details = contact.details || {};

        // 1. Firmographic Data (30 pts)
        if (contact.company) score += 10;
        if (contact.role && (contact.role.includes('VP') || contact.role.includes('Director'))) score += 15;
        if (contact.email && !contact.email.includes('gmail.com')) score += 5; // Business email

        // 2. Behavioral/Engagement (50 pts) - Mocked for now
        // In real app, this would come from an 'activities' array
        const activityCount = contact.activityCount || 0;
        score += Math.min(activityCount * 5, 50);

        // 3. Negative signals
        if (contact.bounced) score -= 20;

        return Math.min(Math.max(score, 0), 100); // Clamp 0-100
    }

    static getGrade(score) {
        if (score >= 80) return { label: 'Hot', color: 'success' };
        if (score >= 50) return { label: 'Warm', color: 'warning' };
        return { label: 'Cold', color: 'text-tertiary' };
    }
}
