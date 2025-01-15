package org.unical.webapp.backend.service;

import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import java.sql.Blob;
import java.util.Collection;

public interface UtenteServiceInterface {

    Collection<Utente> getAll();
    Utente getByUsername(String username);
    void newUtente(Utente utente);
    void deleteUtente(Utente utente);
    void newBgImage(Utente utente, byte[] image);
    void newProPic(Utente utente, byte[] image);

    Collection<Contenuto> getContenutiByUtente(Utente utente);

    boolean checkExistingUtente(String username,String mail);
    boolean login(String mail, String password);
}
