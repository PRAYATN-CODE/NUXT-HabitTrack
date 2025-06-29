<template>
    <div class="space-y-6">
        <header class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Your Habits</h1>
            <UBadge color="primary" variant="solid">
                Total: {{ habits.length }}
            </UBadge>
        </header>

        <div v-if="habits.length === 0" class="text-center py-12">
            <Icon name="lucide:calendar-check" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p class="text-gray-500">No habits tracked yet. Start building good habits!</p>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="(habit, index) in habits" :key="index" class="hover:shadow-md transition-shadow duration-200"
                :ui="{
                    base: 'h-full flex flex-col',
                    body: { base: 'flex-1' },
                    footer: { padding: 'px-4 py-3' }
                }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-lg text-gray-900">{{ habit.name }}</h3>
                        <UBadge :color="habit.streak > 0 ? 'emerald' : 'gray'" variant="subtle">
                            Streak: {{ habit.streak }} days
                        </UBadge>
                    </div>
                </template>

                <div class="space-y-4">
                    <div>
                        <h4 class="text-sm font-medium text-gray-500 mb-2">Completion Dates</h4>

                        <div class="space-y-2 mb-2">
                            <div v-for="(date, index) in habit.completion" :key="index" class="flex items-center gap-3">
                                <span class="text-sm text-gray-700">{{ date }}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-start gap-2">
                            <input id="date" type="checkbox" :checked="isDateCompleted(habit.completion)"
                                @change="(e) => handleCompletion(habit, e.target.checked)"
                                class="h-4 w-4 text-emerald-600 rounded border-gray-300" />
                            <label for="date" class="text-sm font-semibold text-gray-600">Mark as Completed</label>
                        </div>
                    </div>
                </div>


                <template #footer>
                    <div class="flex justify-end items-center">
                        <div class="flex items-center space-x-2">

                            <UModal title="Update Your Habit"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                                <UButton @click="prepareEditModal(habit)" icon="lucide:pencil" color="neutral"
                                    variant="subtle" size="sm" />

                                <template #body>
                                    <UForm :state="editForm" @submit.prevent="updateHabit" class="w-full space-x-4">
                                        <UFormGroup label="Habit Name" class="mb-4 w-full">
                                            <UInput v-model="editForm.name" />
                                        </UFormGroup>

                                        <UButton type="submit" label="Save Changes" color="primary" />
                                    </UForm>
                                </template>
                            </UModal>

                            <UTooltip text="Delete habit">
                                <UButton @click="handleDeleteHabits(habit.id)" icon="lucide:trash-2" color="neutral"
                                    variant="subtle" size="sm" />
                            </UTooltip>

                        </div>
                    </div>
                </template>
            </UCard>
        </div>


    </div>
</template>

<script setup>
import { useHabitStore } from '~/stores/habits';

const props = defineProps({
    habits: {
        type: Array,
        default: () => []
    }
})

const habitStore = useHabitStore();
// Modal control
const isEditModalOpen = ref(false)

const editForm = reactive({
    id: null,
    name: '',
    completion: [],
    streak: 0
})

// Prepare modal with selected habit
const prepareEditModal = (habit) => {
    editForm.id = habit?.id || null
    editForm.name = habit?.name || ''
    editForm.completion = habit?.completion || []
    editForm.streak = habit?.streak || 0

    isEditModalOpen.value = true
}

const isDateCompleted = (dates) => {
    if (dates.length !== 0) {
        return true
    } else {
        return false
    }
}

// Update the habit (you can connect this to your store or Firestore)
const updateHabit = async () => {
    try {
        await habitStore.updateHabit(editForm.id, {
            name: editForm.name,
            streak: editForm.streak,
            completion: editForm.completion
        })

        isEditModalOpen.value = false
    } catch (err) {
        console.error('Update failed:', err)
    }
}

const handleCompletion = async (habit, isChecked) => {
    try {
        await habitStore.toggleCompletion(habit, isChecked)
    } catch (error) {
        console.error(error)
    }
}

const handleDeleteHabits = async (id) => {

    if (!id) return

    try {
        await habitStore.deleteHabit(id);
        // Success - you might add a toast here
        console.log(id)
    } catch (error) {
        console.log(id)
    }
}

</script>