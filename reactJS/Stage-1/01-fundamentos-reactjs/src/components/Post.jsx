import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { useState } from 'react';






export function Post({ author, content, publisheAd}) {



  // constantes
  const [newCommentText, setNewCommentText] = useState('') // inicia como uma str vazia

  const [comments, setComments] = useState([
    
  ]
  )

  const publishedDateFormatted = format(publisheAd, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })
  
  const publishedDateRelativeToNow = formatDistanceToNow(publisheAd, {
    locale: ptBR,
    addSuffix: true
  });

  const isNewCommentEmpty = newCommentText.length === 0

  
  //funções
  function handleCreateNewComment(event){
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')

  }

  function handleNewCommentChange(event){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }


  function deleteComment(commentToDeleted){

    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDeleted
    })

    setComments(commentsWithoutDeletedOne)
  }


  function handleNewCommentInvalid(event){
    event.target.setCustomValidity('Este campo é obrigatorio')
  }



  // retorno
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
        <Avatar hasBorder src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publisheAd.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line=>{
          if (line.type === 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          } else if(line.type === 'link'){
            return <p key={line.content}><a href="#">{line.content}</a></p>

          }
        })}


      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required={true}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
            return (
              <Comment key={comment} content={comment} onDeleteComment={deleteComment}
              />
            )
          })}
      </div>

    </article>
  )
}