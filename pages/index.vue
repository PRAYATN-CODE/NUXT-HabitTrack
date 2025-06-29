<template>
    <div class="px-4 py-8 max-w-6xl mx-auto space-y-10">
        <HabitHome/>
        <HabitForm />
        <HabitList :habits="habitStore.habits" />
    </div>
</template>

<script setup>
import { useHabitStore } from '~/stores/habits';


const habitStore = useHabitStore();

habitStore.fetchHabits()
console.log(habitStore.habits)

</script>