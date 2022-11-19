const AddHabitModal = ({ name }) => {
  return (
    <div id="AddHabitModal">
      <div className="modal">{JSON.stringify(name)} added</div>
    </div>
  )
}

export default AddHabitModal
