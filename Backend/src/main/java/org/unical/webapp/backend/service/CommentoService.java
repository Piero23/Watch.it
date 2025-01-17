package org.unical.webapp.backend.service;

import org.springframework.stereotype.Service;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.persistence.dao.CommentoDao;

@Service
public class CommentoService implements CommentoServiceInterface{

    private final CommentoDao commentoDao;

    public CommentoService(CommentoDao commentoDao) {
        this.commentoDao = commentoDao;
    }

    @Override
    public Commento getCommentoById(int id) {
        return commentoDao.findById(id);
    }

    @Override
    public void setAnswer(Commento question, Commento answer) {
        commentoDao.setAnswer(question, answer);
    }

    @Override
    public void saveCommento(Commento commento) {
        commentoDao.save(commento);
    }

    @Override
    public void deleteComment(int commento) {
        commentoDao.delete(commento);
    }


}
