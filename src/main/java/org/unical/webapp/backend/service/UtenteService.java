package org.unical.webapp.backend.service;

import org.springframework.stereotype.Service;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import org.unical.webapp.backend.persistence.dao.UtenteDao;

import java.sql.Blob;
import java.util.Collection;

@Service
public class UtenteService implements UtenteServiceInterface {

    private final UtenteDao utenteDao;

    UtenteService(UtenteDao utenteDao) {
        this.utenteDao = utenteDao;
    }

    @Override
    public Collection<Utente> getAll() {
        return utenteDao.findAll();
    }

    @Override
    public Utente getByUsername(String username) {
        return utenteDao.findByusername(username);
    }

    @Override
    public void newUtente(Utente utente) {
        utenteDao.save(utente);
    }

    @Override
    public void deleteUtente(Utente utente) {
        utenteDao.delete(utente);
    }

    @Override
    public void newBgImage(Utente utente, Blob image) {
        utenteDao.updateBgImage(utente, image);
    }

    @Override
    public void newProPic(Utente utente, Blob image) {
        utenteDao.updateProPic(utente, image);
    }

    @Override
    public Collection<Contenuto> getContenutiByUtente(Utente utente) {
        return utenteDao.getContenutiByUtente(utente);
    }


}
