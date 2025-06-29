<template>
    <div class="flex items-center justify-center">
        <UCard class="w-full border border-gray-200" :ui="{
            base: 'rounded-2xl',
            header: { padding: 'px-6 py-8' },
            body: { padding: 'px-6 py-6' },
            footer: { padding: 'px-6 py-4' }
        }">
            <!-- Header -->
            <template #header>
                <div class="text-center space-y-3">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mx-auto">
                        <Icon name="lucide:user-round" class="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Welcome to HabitTrack</h1>
                    <p class="text-gray-600">Let’s personalize your experience</p>
                </div>
            </template>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="flex gap-4 justify-between w-full">
                <UInput v-model="name" placeholder="Enter your full name" icon="lucide:user" size="lg" color="primary"
                    autofocus :ui="{
                        icon: { base: 'text-primary-500 dark:text-primary-400' },
                        variant: {
                            outline: 'focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                        }
                    }" class="w-full" />

                <UButton type="submit" label="Continue" size="lg" color="primary" variant="solid" class="self-end"
                    :loading="isLoading" :disabled="!name.trim()"
                    :trailing-icon="!isLoading ? 'lucide:arrow-right' : undefined" :ui="{
                        base: 'transition-all duration-200',
                        color: {
                            primary: {
                                solid: 'shadow-sm hover:shadow-md hover:shadow-primary-100'
                            }
                        }
                    }" />
            </form>

            <!-- Footer -->
            <template #footer>
                <p class="text-center text-xs text-gray-500 leading-relaxed">
                    By continuing, you agree to our
                    <NuxtLink to="#" class="text-primary-600 hover:underline font-medium">Terms</NuxtLink> and
                    <NuxtLink to="#" class="text-primary-600 hover:underline font-medium">Privacy Policy</NuxtLink>.
                </p>
            </template>
        </UCard>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useHabitStore } from '~/stores/habits';

const name = ref('');
const isLoading = ref(false);
const habitStore = useHabitStore();

const handleSubmit = async () => {
    if (!name.value.trim()) return;

    isLoading.value = true;

    try {
        await habitStore.addHabit(name.value);
        // Success - you might add a toast here
        useToast().add({
            title: 'Welcome!',
            description: `Hello ${name.value}, let's build some good habits!`,
            icon: 'lucide:check-circle-2',
            color: 'primary'
        });
    } catch (error) {
        useToast().add({
            title: 'Error',
            description: 'Could not save your name',
            icon: 'lucide:alert-circle',
            color: 'red'
        });
    } finally {
        isLoading.value = false;
    }
};
</script>