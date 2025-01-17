package org.unical.webapp.backend.service;

import org.springframework.stereotype.Service;
import org.unical.webapp.backend.model.Commento;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.persistence.dao.ContenutoDao;
import org.unical.webapp.backend.persistence.dao.UtenteDao;

import java.util.Collection;
import java.util.List;

@Service
public class ContenutoService implements ContenutoServiceInterface {

    private final ContenutoDao contenutoDao;


    public ContenutoService(ContenutoDao contenutoDao) {
        this.contenutoDao = contenutoDao;
    }

    @Override
    public Collection<Commento> getCommenti(Contenuto contenuto) {
        return contenuto.getCommenti();
    }

    @Override
    public Contenuto getById(int id, boolean type) {
        return contenutoDao.findById(id, type);
    }

    @Override
    public Collection<Contenuto> getByUtente(String username) {
        return contenutoDao.findByUtente(username);
    }

    @Override
    public void aggiornaStatusContenuto(String utente, int contenutoID, boolean isSerie, int status) {
        contenutoDao.updateStatus(utente, contenutoID, isSerie, status);
    }

    @Override
    public void aggiornaVisualizzazione(String utente, int contenutoID, int stagione, int episodio) {
        contenutoDao.updateSeasonEpisode(utente, contenutoID, stagione, episodio);
    }

    @Override
    public void deleteContenuto(int id, boolean isSerie, String username){
        contenutoDao.delete(id, isSerie, username);
    }

    @Override
    public void modificaVoto(String utente, boolean type, int idContenuto, int rating){
        contenutoDao.editRating(utente, type, idContenuto, rating);
    }
}
