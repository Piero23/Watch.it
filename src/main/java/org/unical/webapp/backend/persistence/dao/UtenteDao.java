package org.unical.webapp.backend.persistence.dao;

import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import java.sql.Blob;
import java.util.List;

public interface UtenteDao {

  public Utente findByusername(String username);
  public List<Utente> findAll();
  public void save(Utente utente);
  public void delete(Utente utente);
  public List<Contenuto> getContenutiByUtente(Utente utente);

  public void updateProPic(Utente utente, byte[] proPic);
  public void updateBgImage(Utente utente, byte[] bgImage);

  boolean checkExisting(String username,String mail);

  boolean login(String email, String password);
}
