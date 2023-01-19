# Habit App

## Description

This is a non-punishing app that will help the user form habits.

<!-- ## Rules (In progress)

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

1. When switching from an empty route to a route like Add Habit or Test Habits, the navbar jumps. It's not super aligned. Unknown cause.

## What I learned

1. Use setHabits only once every update. Don't use more than two functions to use setHabits at the same time.
2. !"" === true lmao
3. Convert dates to utc for cases where dates span a DST change
4. Use onSubmit for forms instead of onClick, so that the "required" fields work
5. Cannot use useRef outside of the thing you ref lmao
6. Functional state updates setBlahBlah((currBlahBlah)=>{})

# To Dos

4. Make auto check for stable habit cards; it can be turned off in options (is this a bad idea?)
5. Make a filter by date, streak, etc
6. Store in local storage
7. Firebase
8. If auto check for stable habits is turned on, make a reminder to update the habit when it hasn't been updated in a while, maybe 30 days or something.
9. Stats
10. Add month names on year calendar
11. There will be a StableStatsCard and UnstableStatsCard
12. Actually code lol
13. Make a better looking HabitInfoModal
14. Take a break
15. Add a Milestone Reward. (I will buy a switch when I reach 100 days or something and then it keeps track of it for you)
16. Add "evolving habit" option idk yet
17. Maybe add leaderboard, way to share with friends -->

# How it Works

1. It typically takes 66 days to form a habit, but the time may vary based on the person and the habit (between 18 and 254 days).

2. There are two types of habits: stable and unstable. To change an unstable habit to a stable habit, you must maintain the habit for 66 days (or the number of days you set).

3. You can partially complete a task (e.g., flossing only your bottom teeth) to encourage daily consistency. This will still count towards your streak towards promotion to a stable habit. Tap a gray circle once to mark the task as done. Tap it twice to mark the task as partially done.

4. You can only add up to three unstable habits at a time to prevent feeling overwhelmed. These are your main focus. You can add any number of stable habits.

5. If you miss three days (or the number of days you set) of a stable habit, it will be demoted to an unstable habit.

6. There is a warning if a stable habit is close to being demoted to an unstable habit (e.g., if it has not been completed for three consecutive days).
