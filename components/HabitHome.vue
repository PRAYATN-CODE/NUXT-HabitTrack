<template>
    <div class="pt-10">

        <!-- Hero Section -->
        <section class="text-center space-y-4">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome to HabitTracker
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Build healthy habits and track your progress every day. Stay consistent and crush your goals!
            </p>
            <UButton size="lg" color="emerald" icon="lucide:rocket">
                Get Started
            </UButton>
        </section>

        <!-- Features -->
        <section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="feature in features" :key="feature.title" class="hover:shadow-lg transition"
                :ui="{ body: 'space-y-2', base: 'h-full flex flex-col' }">
                <template #header>
                    <div class="flex items-center gap-3">
                        <Icon :name="feature.icon" class="w-6 h-6 text-emerald-500" />
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ feature.title }}</h3>
                    </div>
                </template>
                <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </UCard>
        </section>

        <!-- About / CTA Section -->
        <section class="text-center space-y-4">
            <UAvatar size="lg" src="https://api.dicebear.com/7.x/bottts/svg?seed=habit" alt="Mascot" class="mx-auto" />
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Stay motivated. Track every step.
            </h2>
            <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Whether you're building new habits or breaking old ones, HabitTracker helps you stay on course.
            </p>
            <UButton size="md" color="gray" variant="outline" icon="lucide:info">
                Learn More
            </UButton>
        </section>

    </div>
</template>

<script setup>

const features = [
    {
        title: 'Track Daily Progress',
        description: 'Log your habits daily and visualize your growth over time.',
        icon: 'lucide:calendar-check'
    },
    {
        title: 'Streaks & Motivation',
        description: 'Stay motivated with streak tracking and performance indicators.',
        icon: 'lucide:flame'
    },
    {
        title: 'Easy to Use',
        description: 'A clean and minimal interface so you can focus on your goals.',
        icon: 'lucide:sparkles'
    }
]
</script>
