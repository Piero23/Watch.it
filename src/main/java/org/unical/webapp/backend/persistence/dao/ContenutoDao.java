package org.unical.webapp.backend.persistence.dao;

import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;

import java.util.List;

public interface ContenutoDao {

  public Contenuto findById(int id, boolean type);
  public List<Contenuto> findAll();
  public List<Contenuto> findByUtente(String utente);
  public void save(int idContenuto, boolean tipo);
  public void delete(Contenuto contenuto);
  public void updateStatus(String utente, int idContenuto, boolean tipo, int status);
  public void updateSeasonEpisode(String utente, int idContenuto, int stagione, int episodio);

}
