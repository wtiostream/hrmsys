package com.hrmsys.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Train entity. @author MyEclipse Persistence Tools
 */

public class Train implements java.io.Serializable {

	// Fields
	private Integer trainId;
	private String trainTitle;
	private String trainLevel;
	private String trainContent;
	private Date trainStartDate;
	private Date trainEndDate;
	private String trainPlace;
	private String trainPerson;
	private String trainRemark;
	private String trainAddPerson;
	private Set trainRecords = new HashSet(0);

	// Constructors

	/** default constructor */
	public Train() {
	}

	/** minimal constructor */
	public Train(Integer trainId, String trainTitle, String trainLevel, Date trainStartDate,
			Date trainEndDate, String trainPerson, String trainAddPerson) {
		super();
		this.trainId = trainId;
		this.trainTitle = trainTitle;
		this.trainLevel = trainLevel;
		this.trainStartDate = trainStartDate;
		this.trainEndDate = trainEndDate;
		this.trainPerson = trainPerson;
		this.trainAddPerson = trainAddPerson;
	}

	/** full constructor */
	public Train(Integer trainId, String trainTitle, String trainLevel,String trainContent,
			Date trainStartDate, Date trainEndDate, String trainPlace,
			String trainPerson, String trainRemark, String trainAddPerson,
			Set trainRecords) {
		super();
		this.trainId = trainId;
		this.trainTitle = trainTitle;
		this.trainLevel = trainLevel;
		this.trainContent = trainContent;
		this.trainStartDate = trainStartDate;
		this.trainEndDate = trainEndDate;
		this.trainPlace = trainPlace;
		this.trainPerson = trainPerson;
		this.trainRemark = trainRemark;
		this.trainAddPerson = trainAddPerson;
		this.trainRecords = trainRecords;
	}

	public Integer getTrainId() {
		return trainId;
	}

	public void setTrainId(Integer trainId) {
		this.trainId = trainId;
	}

	public String getTrainTitle() {
		return trainTitle;
	}

	public void setTrainTitle(String trainTitle) {
		this.trainTitle = trainTitle;
	}

	public String getTrainContent() {
		return trainContent;
	}

	public void setTrainContent(String trainContent) {
		this.trainContent = trainContent;
	}

	public Date getTrainStartDate() {
		return trainStartDate;
	}

	public void setTrainStartDate(Date trainStartDate) {
		this.trainStartDate = trainStartDate;
	}

	public Date getTrainEndDate() {
		return trainEndDate;
	}

	public void setTrainEndDate(Date trainEndDate) {
		this.trainEndDate = trainEndDate;
	}

	public String getTrainPlace() {
		return trainPlace;
	}

	public void setTrainPlace(String trainPlace) {
		this.trainPlace = trainPlace;
	}

	public String getTrainPerson() {
		return trainPerson;
	}

	public void setTrainPerson(String trainPerson) {
		this.trainPerson = trainPerson;
	}

	public String getTrainRemark() {
		return trainRemark;
	}

	public void setTrainRemark(String trainRemark) {
		this.trainRemark = trainRemark;
	}

	public String getTrainAddPerson() {
		return trainAddPerson;
	}

	public void setTrainAddPerson(String trainAddPerson) {
		this.trainAddPerson = trainAddPerson;
	}

	public Set getTrainRecords() {
		return trainRecords;
	}

	public void setTrainRecords(Set trainRecords) {
		this.trainRecords = trainRecords;
	}

	public String getTrainLevel() {
		return trainLevel;
	}

	public void setTrainLevel(String trainLevel) {
		this.trainLevel = trainLevel;
	}

}