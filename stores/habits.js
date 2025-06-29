import { differenceInDays, format } from "date-fns"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { defineStore } from "pinia"

export const useHabitStore = defineStore('habitStore', {
    state: () => ({
        habits: []
    }),

    actions: {

        async fetchHabits() {
            const { $db } = useNuxtApp()

            // ✅ get reference to the habits COLLECTION
            const habitsCollectionRef = collection($db, "habits")

            const snapshot = await getDocs(habitsCollectionRef)

            this.habits = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        },

        async addHabit(name) {
            const { $db } = useNuxtApp()

            // ✅ get reference to the habits COLLECTION
            const habitsCollectionRef = collection($db, "habits")

            const habit = {
                name,
                completion: [],
                streak: 0
            }

            const docRef = await addDoc(habitsCollectionRef, habit)

            this.habits.push({ id: docRef.id, ...habit })
        },

        async deleteHabit(id) {

            const { $db } = useNuxtApp()

            const docRef = doc($db, 'habits', id)

            await deleteDoc(docRef)

            this.habits = this.habits.filter((habit) => habit.id !== id)

        },

        async updateHabit(id, updateItem) {

            const { $db } = useNuxtApp()

            const docRef = doc($db, 'habits', id)

            await updateDoc(docRef, updateItem)

            const index = this.habits.findIndex(h => h.id === id)
            if (index !== -1) {
                this.habits[index] = { ...this.habits[index], ...updateItem }
            }

        },

        toggleCompletion(habit, isChecked) {

            const today = format(new Date(), 'yyyy-MM-dd')

            if (isChecked) {
                if (!habit.completion.includes(today)) {
                    habit.completion.push(today)
                }
            } else {
                habit.completion = habit.completion.filter((date) => date !== today)
            }

            habit.streak = this.calculateStreak(habit.completion)

            this.updateHabit(habit.id, {
                completion: habit.completion,
                streak: habit.streak
            })

        },

        calculateStreak(completion) {

            const sortedDates = completion.sort((a, b) => new Date(b) - new Date(a))

            let streak = 0
            let currentDate = new Date()

            for (const date of sortedDates) {
                const diff = differenceInDays(currentDate, new Date(date))
                if (diff > 1) {
                    break
                }
                streak += 1
                currentDate = new Date(date)
            }

            return streak

        },

    }
})
