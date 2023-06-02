# calendar-reactjs
The calendar component uses react typescript, tailwind css.

### Example screenshot
![image](https://github.com/gentabelardi/calendar-reactjs/assets/78941367/180bb0f2-4b82-45f6-af04-aba13069e41e)

### Example of the component calling setup
Before you use this code make sure you already have a project next js or react js with typescript.

example useState and handleSeletectDate function:
```
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const handleSelectDate = (date: Date) => {
      setSelectedDate(date);
 };
```
example of calling the component:
```
<Calendar onSelectDate={handleSelectDate} />
```
