package org.unical.webapp.backend.model;

import java.util.List;

public class Contenuto {

  protected int id_contenuto;
  protected boolean is_serie;

  protected String utente;
  protected int stagione;
  protected int episodio;

  protected int status;
  protected int rating;

  protected List<Commento> commenti;


  public Contenuto(int id_contenuto, boolean is_serie, String utente, int stagione, int episodio, int status, int rating, List<Commento> commenti) {
    this.id_contenuto = id_contenuto;
    this.is_serie = is_serie;
    this.utente = utente;
    this.stagione = stagione;
    this.episodio = episodio;
    this.status = status;
    this.rating = rating;
    this.commenti = commenti;
  }

  public Contenuto() {
  }

  public int getId_contenuto() {
    return id_contenuto;
  }

  public void setId_contenuto(int id_contenuto) {
    this.id_contenuto = id_contenuto;
  }

  public boolean isIs_serie() {
    return is_serie;
  }

  public void setIs_serie(boolean is_serie) {
    this.is_serie = is_serie;
  }

  public String getUtente() {
    return utente;
  }

  public void setUtente(String utente) {
    this.utente = utente;
  }

  public int getStagione() {
    return stagione;
  }

  public void setStagione(int stagione) {
    this.stagione = stagione;
  }

  public int getEpisodio() {
    return episodio;
  }

  public void setEpisodio(int episodio) {
    this.episodio = episodio;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public List<Commento> getCommenti() {
    return commenti;
  }

  public void setCommenti(List<Commento> commenti) {
    this.commenti = commenti;
  }
}
