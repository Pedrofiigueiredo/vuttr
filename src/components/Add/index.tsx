import React, { FormEvent, useState } from 'react';
import api from '../../services/api';
import './styles.css';

interface AddProps {
  close(): any,
}

const Add: React.FC<AddProps> = ({ close = () => {} }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');

  async function AddTool(e: FormEvent) {
    e.preventDefault()
    const tagList = tags.split(' ')

    await api.post('/tools', {
      title,
      description,
      link,
      tags: tagList
    });
    close()
  }

  return (
    <div className="Main">
      <div className="popup">
        <h2>+ Add new tool</h2>
        <form onSubmit={AddTool}>
          <label htmlFor="name">Tool name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="link">Tool link</label>
          <input
            required
            type="text"
            name="link"
            placeholder="http://bossabox.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <label htmlFor="description">Tool description</label>
          <textarea
            required
            name="description"
            placeholder="Describe the tool"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="tags">Tags</label>
          <input
            required
            type="text"
            name="tags"
            placeholder="Enter your tags with space"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <footer>
            <button onClick={close} className="secondary">Cancel</button>
            <button type="submit">Add tool</button>
          </footer>
        </form>
       
      </div>
    </div>
  )
}

export default Add;