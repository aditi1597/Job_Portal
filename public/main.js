

function deleteJob(id){
    if(confirm("Are you sure you want to delete this job?")){
        fetch("/deleteJob/" + id,{
            method: 'POST'
        }).then((res) => {
            if(res.ok){
                window.location.href = '/';
            }
        })
    }
}