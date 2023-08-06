/**
* update page component
* 
* This is the page to update the award status of papers 
* 
* @author Martyn Clow W20045942
*/

function UpdateAward(props) {

  const handleSelect = (event) => {
   
    const formData = new FormData();   
    formData.append('award', event.target.value);
    formData.append('paper_id', props.papers.paper_id);
 
    const token = localStorage.getItem('token');
    fetch("http://unn-w20045942.newnumyspace.co.uk/kf6012/assignment/api/update",
          {
             method: 'POST',
             headers: new Headers( { "Authorization": "Bearer " + token}),
             body: formData
         })
         .then(
             (response) => response.text()
         )   
         .then(
            (json) => {
            console.log(json)
            props.handleUpdate()
         })
         .catch(
            (e) => {
            console.log(e.message)
            })
 }
 
    return (
      <div>
        {props.papers.title}
        <p>Award Status</p>
        <select value={props.papers.award} onChange={handleSelect}>
            <option value="true">Yes</option>
            <option value= "false">No</option>
        </select>
      </div>
    )
  }

  export default UpdateAward;

