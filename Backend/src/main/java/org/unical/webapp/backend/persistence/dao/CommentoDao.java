package org.unical.webapp.backend.persistence.dao;

import org.unical.webapp.backend.model.Commento;

import java.util.List;

public interface CommentoDao {

  public Commento findById(int id);
  public List<Commento> findAll();
  public void save(Commento commento);
  public void delete(int commento);
  public List<Commento> findByContent(int contentId, boolean type);
  public List<Commento> findResponses(Commento commento);
  public void setAnswer(Commento question, Commento answer);

}
