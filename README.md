# Habit App

## Description

This is a non-punishing app that will help the user form habits.

## Rules (In progress)

1. Have two groups: "stable habits" and "unstable habits"
2. It takes 66 days on average to form a habit, but it's actually a range depending on the person and the habit (from 18 days to 254 days)
3. 66 days is the default streak that you need to have in order to change an "unstable habit" to a "stable habit"
4. If a "stable habit" is a daily task, and you miss 3 days, it will be demoted to an "unstable habit". When this happens, you can provide a reason (or not lol) why the habit was broken so you can revisit it later when you try again.
5. You can only add 1-3 "unstable habit" at a time, to prevent being overwhelmed. These are your main focus.
6. You can add any number of "stable habits".
7. All days are editable, (green to gray, gray to green) you don't need to check the app everyday. It won't punish you.
8. If you have been doing your unstable habit for 66 days (or whatever number of days), then it would be promoted to a stable habit.
9. There is a warning if a stable habit is about to be demoted to an unstable habit. (e.g 2 consecutive days not done)
10. When setting up a new unstable habit for the first time, there would be a guide for the user to make it a small step. Give examples like, if you want to go to the gym early, make it so that you wake up early. The unstable habit can also evolve. From "wake up early" to "wake up early and change to gym shoes" and then to "wake up early and change to gym clothes" until you reach your main goal to go to the gym early. there would be a pop-up asking you to edit the unstable habit to its next step.
11. There is an option where you only partially do the task. This is to encourage the user to do the task daily, even if it's only partially done. It will help them be consistent everyday. (e.g. You only flossed your bottom teeth instead of all your teeth) This will still continue your streak towards promotion to a stable habit.
12. You can choose to reward yourself when you hit a number of days that you have set (e.g. I will buy myself a slice of Gouda when I hit 15 days)
13. Make an option to set an alarm during a particular time. Either that or a trigger/situation. What happens before or after the habit?
14. Display your progress in percentage, current streak, longest streak.
15. Just an idea: stable habits can evolve to solidified habits. There can be 10 levels, all levels named after the mohs scale levels. (Talc to Diamond)
16. Add a sound/animation when you update a day
17. When you drag through squares, they all change to green or darkgreen or whatever
18. Add a legend on the green colors of the calendar

## Known bugs

1. When switching from an empty route to a route like Add Habit or Test Habits, the navbar jumps. It's not super aligned.

## What I learned

1. Use setHabits only once every update. Don't use more than two functions to use setHabits at the same time.
2. !"" === true lmao
3. Convert dates to utc for cases where dates span a DST change
4. Use onSubmit for forms instead of onClick, so that the "required" fields work
5. Cannot use useRef outside of the thing you ref lmao
6. Functional state updates setBlahBlah((currBlahBlah)=>{})

# To Dos

<!-- 1. Make card options work; it has more info, update, delete, etc -->
<!-- 2. Make StableCalendarCard and UnstableCalendarCard -->
<!-- 3. Make unstable habit limit work -->

4. Make auto check for stable habit cards; it can be turned off in options (is this a bad idea?)
5. Make a filter by date, streak, etc
   <!-- 6. Add instructions on top; it can be turned off in options -->
   <!-- 7. Add legends at the bottom; it can be turned off in options -->
6. Store in local storage
7. Firebase
8. If auto check for stable habits is turned on, make a reminder to update the habit when it hasn't been updated in a while, maybe 30 days or something.
9. Stats
10. Add month names on year calendar
<!-- 13. Add a visual reminder if a stable habit is about to be demoted -->
11. There will be a StableStatsCard and UnstableStatsCard
<!-- 15. Put something on screen when there is nothing to list (e.g. there are no stable habits, no unstable habits, or both) -->
12. Actually code lol
<!-- 17. Make something happen (maybe use party-js) when an unstable habit gets promoted to a stable habit. Right now it just disappears when viewed from Home. Make something happen when a stable habit gets demoted. -->
13. Make a better looking HabitInfoModal
14. Take a break
15. Write a "How it Works" section maybe, simplify and rewrite with chat gpt
16. Add a Milestone Reward. (I will buy a switch when I reach 100 days or something and then it keeps track of it for you)
17. Add "evolving habit" option idk yet
18. Maybe add leaderboard, way to share with friends
<!-- 19. Find a way to add a year to the calendar (when a new year comes or the app has not been opened for a long time) -->

# How it Works

# written by Chat-GPT

1. There are two categories of habits: "stable" and "unstable."
2. On average, it takes 66 days to form a habit, but the time can vary depending on the person and the habit (from 18 to 254 days).
3. The default streak needed to change an "unstable habit" to a "stable habit" is 66 days.
4. If a "stable habit" is a daily task and you miss three days, it will be demoted to an "unstable habit." When this happens, you can optionally provide a reason for breaking the habit.
5. You can only add one to three "unstable habits" at a time to avoid feeling overwhelmed. These are your main focus.
6. You can add any number of stable habits.
7. You can edit your progress on any day (marking it as complete or incomplete). The app will not punish you for not checking it every day.
8. If you have been working on an unstable habit for 66 days (or the number of days you set), it will be promoted to a stable habit.
9. There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for two consecutive days).
10. When setting up a new unstable habit, there is a guide to help you make it a small, achievable step. For example, if you want to go to the gym early, start by making it a goal to wake up early. The unstable habit can evolve over time, from 'wake up early' to 'wake up early and put on gym shoes,' and then to 'wake up early and put on gym clothes,' until you reach your ultimate goal of going to the gym early. There is an option to edit the unstable habit to its next step.
11. There is an option to partially complete a task to encourage daily consistency (e.g., flossing only your bottom teeth instead of all of them). This will still count towards your streak towards promotion to a stable habit.
12. You can choose to reward yourself when you reach a certain number of days (e.g., buying yourself a slice of Gouda when you hit 15 days).

10 & 12 not implemented

# How it Works Again

# rewritten by Chat-GPT

There are two types of habits: stable and unstable. It typically takes 66 days to form a habit, but the time may vary based on the person and the habit (between 18 and 254 days).
To change an unstable habit to a stable habit, you must maintain the habit for 66 days (or the number of days you set).
You can only add up to three unstable habits at a time to prevent feeling overwhelmed. These are your main focus. You can add any number of stable habits.
If you miss three days (or the number of days you set) of a daily stable habit, it will be demoted to an unstable habit.
You can edit your progress on any day by marking it as complete or incomplete. The app will not penalize you for not checking it every day.
When setting up a new unstable habit, there is a guide to help you make it a small, achievable step. For example, if your ultimate goal is to go to the gym early, you might start by making it a goal to wake up early. The unstable habit can evolve over time, from 'wake up early' to 'wake up early and put on gym shoes,' and then to 'wake up early and put on gym clothes.' You can edit the unstable habit to its next step.
You can partially complete a task (e.g., flossing only your bottom teeth) to encourage daily consistency. This will still count towards your streak towards promotion to a stable habit.
There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for two consecutive days).
You can choose to reward yourself when you reach a certain number of days (e.g., buying yourself a slice of Gouda when you hit 15 days).
