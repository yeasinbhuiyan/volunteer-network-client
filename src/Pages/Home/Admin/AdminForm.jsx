import React from 'react';

const AdminForm = () => {

    const handlePost = (event) => {
        event.preventDefault()
        const form = event.target

        const title = form.title.value
        const date = form.date.value
        const banner = form.banner.value
        const description = form.description.value

        const postDetails = {
            title,
            img: banner,
            description,
            date,

        }

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postDetails)
        })
        .then(res => res.json())
        .then(data => console.log(data))

        
        console.log(postDetails)

    }


    return (


        <div className='p-16'>
            <form onSubmit={handlePost}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Event Title</span>
                        </label>
                        <input type="text" name='title' placeholder='Event Title' className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Event Date</span>
                        </label>
                        <input type="date" name='date' className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name='description' placeholder="Description" className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Banner Url</span>
                        </label>
                        <input type="url" name='banner' placeholder="Banner Url" className="input input-bordered" />

                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-success w-full " type="submit" value="Submit" />

                </div>
            </form>
        </div>


    );
};

export default AdminForm;